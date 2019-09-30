package vocalink.demo.service;
import java.util.Optional;
import java.util.concurrent.CompletionStage;

import vocalink.demo.model.Transaction;

public interface Service {
	
	CompletionStage<Optional<String>> processTransaction(Transaction tx);
}
