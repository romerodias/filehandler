package br.com.rdtecnologia.filehandler.controller.converter;

public class JsonReturnSuccess<T> {
	private Boolean success = true;
	private T data;
	public JsonReturnSuccess() {}
	public JsonReturnSuccess(T data) {
		super();
		this.data = data;
	}	public JsonReturnSuccess(Boolean success, T data) {
		super();
		this.success = success;
		this.data = data;
	}
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}

	public static <T> JsonReturnSuccess from(T data) {
		return new JsonReturnSuccess(data);
	}
}
