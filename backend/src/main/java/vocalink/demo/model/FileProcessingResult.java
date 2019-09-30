package vocalink.demo.model;

public class FileProcessingResult {
	private boolean isValid;
	private String errorMessage;
	private String fileName;
	private boolean isProcessed;
	
	
	public FileProcessingResult(String fileName, boolean isValid, String errorMessage) {
		super();
		this.isValid = isValid;
		this.errorMessage = errorMessage;
		this.fileName = fileName;
		this.isProcessed = false;
	}
	public boolean isValid() {
		return isValid;
	}
	public void setValid(boolean isValid) {
		this.isValid = isValid;
		this.isProcessed = true;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	
}
