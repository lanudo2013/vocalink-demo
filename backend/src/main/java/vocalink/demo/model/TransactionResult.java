package vocalink.demo.model;

import java.util.ArrayList;
import java.util.List;

public class TransactionResult {

	private String id;
	private List<FileProcessingResult> results;
	
	public TransactionResult(String id) {
		super();
		this.id = id;
		results = new ArrayList<>();
	}

	public List<FileProcessingResult> getResults() {
		return results;
	}

	public FileProcessingResult addResult(String fileName, boolean isValid, String errorMessage) {
		var r = new FileProcessingResult(fileName, isValid, isValid ? errorMessage : null);
		this.results.add(r);
		return r;
	}

	public String getId() {
		return id;
	}

}
