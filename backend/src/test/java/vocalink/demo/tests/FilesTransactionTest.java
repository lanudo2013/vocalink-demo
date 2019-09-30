package vocalink.demo.tests;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import vocalink.demo.model.Transaction;
import vocalink.demo.service.Constants;
import vocalink.demo.service.Service;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {TestConfig.class})
public class FilesTransactionTest {
	
	@Autowired
	private Service service;
	
	private void addFiles(Transaction tx, String prefix) {
		tx.addFile(prefix + "1.txt");
		tx.addFile(prefix + "2.txt");
		tx.addFile(prefix + "3.txt");
		tx.addFile(prefix + "4.txt");
		tx.addFile(prefix + "5.txt");
	}

	@Test
	public void transactionWithInvalidFile() {
		
		Transaction tx = new Transaction();
		addFiles(tx, "./files-1/");
		var invalidFileName = "./files-1/" + "3.txt";
		
		try {
			Optional<String> result = service.processTransaction(tx)
					 .toCompletableFuture().get();
			Assertions.assertEquals(result.isEmpty(), false);
			Assertions.assertEquals(result.get(), Constants.FAILURE_MSG + ": " + invalidFileName);
		} catch(Exception e) {
			Assertions.fail();
		}
	}
	
	@Test
	public void transactionWithInvalidFileFirstCheck() {
		
		Transaction tx = new Transaction();
		var prefix = "./files-3/";
		addFiles(tx, prefix);
		var invalidFileName = prefix + "2.txt";
		
		try {
			Optional<String> result = service.processTransaction(tx)
					 .toCompletableFuture().get();
			Assertions.assertEquals(result.isEmpty(), false);
			Assertions.assertEquals(result.get(), Constants.FAILURE_MSG + ": " + invalidFileName);
		} catch(Exception e) {
			Assertions.fail();
		}
	}
	
	@Test
	public void transactionWithValidFiles() {
		Transaction tx = new Transaction();
		addFiles(tx, "./files-2/");
		
		try {
			Optional<String> result = service.processTransaction(tx)
					 .toCompletableFuture().get();
			Assertions.assertEquals(result.isEmpty(), true);
		} catch(Exception e) {
			Assertions.fail();
		}
	}
	
	@Test
	public void transactionWithNonExistentFile() {
		Transaction tx = new Transaction();
		addFiles(tx, "./files-2/");
		tx.addFile("6.txt");
		
		try {
			service.processTransaction(tx)
					 .toCompletableFuture().get();
			Assertions.fail();
		} catch(Exception e) {
		}
	}
}
