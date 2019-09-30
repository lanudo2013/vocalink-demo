package vocalink.demo.service;

public class InvalidTokenException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String fileName;
	
	public InvalidTokenException(String fileName) {
		this.fileName = fileName;
	}
	
	@Override
	public String getMessage() {
		return Constants.FAILURE_MSG + ": " + fileName;
	}

}
