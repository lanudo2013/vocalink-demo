package vocalink.demo.service;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.concurrent.CompletionStage;

import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;

import akka.NotUsed;
import akka.actor.ActorSystem;
import akka.japi.pf.PFBuilder;
import akka.stream.ActorMaterializer;
import akka.stream.Graph;
import akka.stream.SourceShape;
import akka.stream.javadsl.FileIO;
import akka.stream.javadsl.Flow;
import akka.stream.javadsl.Sink;
import akka.stream.javadsl.Source;
import akka.util.ByteString;
import vocalink.demo.model.FileProcessingResult;
import vocalink.demo.model.Transaction;
import vocalink.demo.model.TransactionResult;

@org.springframework.stereotype.Service
public class ServiceImpl implements Service {
	
	private static final String INVALID_TOKEN = "#1234#";

	private void dispatchResult(TransactionResult tr) {
		// Do something with the final transaction result
	}
	
	private Flow<String, Optional<String>, NotUsed> processContentFlow(final FileProcessingResult tr) {
		return Flow.of(String.class)
				.map(content -> {
					var newContent = content;
					// do something with content
					return newContent;
				})
				.map(content -> {
					if (content.contains(INVALID_TOKEN)) {
						tr.setValid(false);
						tr.setErrorMessage(Constants.FAILURE_MSG);
			    		throw new InvalidTokenException(tr.getFileName());
			    	}
					tr.setValid(true);
					return Optional.<String>empty();
				});
	}

	@Override
	public CompletionStage<Optional<String>> processTransaction(Transaction tx) {
		var system = ActorSystem.create("FilesReader");
		var mat = ActorMaterializer.create(system);
		var result = new TransactionResult(tx.getId());
				
		final var stringConverter = Flow.of(ByteString.class)
				.map(content -> content.utf8String());
				
		final var fileReader = Flow.of(FileProcessingResult.class)
									.flatMapConcat(tr -> {
										
										var path = Paths.get(new ClassPathResource(tr.getFileName()).getURI());
										
										return FileIO.fromPath(path)
												.via(stringConverter)
												.via(processContentFlow(tr));
									});	
		var list = tx.getFilePaths();
				

		return Source.from(list)
			.map(x -> result.addResult(x, true, null))
			.take(list.size())
			.via(fileReader)
			.recoverWith(new PFBuilder<Throwable, Source<Optional<String>, NotUsed>>().match(InvalidTokenException.class, ex -> {
			       	return Source.single(Optional.of(ex.getMessage()));
			 }).build())
			.runWith(Sink.last(), mat)
			.whenComplete((x, y) -> {
				dispatchResult(result);
			});
	}
	
	

}
