package vocalink.demo.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Transaction {

	private String id;
	private List<String> filePaths;
	
	public Transaction() {
		id = UUID.randomUUID().toString();
		filePaths = new ArrayList<>();
	}

	public String getId() {
		return id;
	}
	
	public void addFile(String s) {
		filePaths.add(s);
	}
	
	public List<String> getFilePaths() {
		return new ArrayList<>(filePaths);
	}

}
