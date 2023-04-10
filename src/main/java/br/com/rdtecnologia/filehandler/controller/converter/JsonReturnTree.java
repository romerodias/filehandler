package br.com.rdtecnologia.filehandler.controller.converter;

import java.util.List;

public class JsonReturnTree<T> {
  private Integer totalCount;
  private List<T> data;
  private Boolean success = true;

  public JsonReturnTree() {}

  public JsonReturnTree(Integer totalCount, List<T> rows) {
    super();
    this.totalCount = totalCount;
    this.data = rows;
  }

  public JsonReturnTree(List<T> page) {
    super();
    this.totalCount = page.size();
    this.data = page;
  }

  public Integer getTotalCount() {
    return totalCount;
  }

  public void setTotalCount(Integer totalCount) {
    this.totalCount = totalCount;
  }

  public List<T> getData() {
    return data;
  }

  public void setData(List<T> rows) {
    this.data = rows;
  }


  public Boolean getSuccess() {
    return success;
  }

  public void setSuccess(Boolean success) {
    this.success = success;
  }
}
