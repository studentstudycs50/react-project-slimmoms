import DiaryStyled from "./DiaryAddProductStyled";
import PlusIcon from "../icons/PlusIcon";
import {
  searchProductOperation,
  addNewProductOperation,
  getCurentDayInfoOperation,
} from "../../redux/operations/diaryOperations";
import { resetList } from "../../redux/actions/diaryActions";
import React, { Component } from "react";
import { connect } from "react-redux";
import FilterList from "./FilterList";
import DiaryCalendar from "./DiaryCalendar";
import back from "../modal/svg/icon-back.svg";
import moment from "moment";

const initialState = {
  product: "",
  weight: "",
  productId: "",
  date: moment(Date.now()).format("YYYY-MM-DD"),
  render: false,
  inputValue: "",
  localEerror: "",
};

class DiaryAddProduct extends Component {
  state = {
    ...initialState,
  };

  submitDiaryAddProduct = (event) => {
    event.preventDefault();
    if (this.state.productId && this.state.weight) {
      this.props.addNewProductOperation({
        date: this.state.date,
        productId: this.state.productId,
        weight: Number(this.state.weight),
      });
      this.setState((prev) => ({ ...initialState, date: prev.date }));
      return;
    }

    this.handleClick();
  };

  inputHandlerDiaryAddProduct = (e) => {
    this.setState({ inputValue: e.target.value });
    if (this.state.inputValue.length <= 2) {
      this.props.resetList();
    } else if (this.state.inputValue.length > 2) {
      this.props.searchProductOperation(this.state.inputValue);
    }
  };

  inputHandlerDiaryAddGramm = (e) => {
    this.setState({ weight: e.target.value });
  };

  filterList = () => {
    return this.props.productVariables.map(({ title, _id }) => {
      return { title: title.ru, id: _id };
    });
  };

  filterListClickLi = (event) => {
    const inputV = this.props.productVariables.find(
      (item) => item._id === event.target.dataset.id
    );
    this.setState((prev) => ({
      ...prev,
      productId: event.target.dataset.id,
      inputValue: inputV.title.ru,
    }));
    this.props.resetList();
  };

  setSelectedData = (date) => {
    this.setState((prev) => ({ ...prev, date: date }));
  };

  handleClick = () => {
    this.setState((prevState) => {
      return { render: !prevState.render };
    });
  };

  render() {
    const filterList = this.filterList();
    if (this.props.mobile) {
      return (
        <DiaryStyled>
          <DiaryCalendar
            setSelectedData={this.setSelectedData}
            getCurentDayInfoOperation={this.props.getCurentDayInfoOperation}
          />
          <div className="triggerButtonWrapper">
            <button
              type="button"
              onClick={this.handleClick}
              className="triggerButton"
            >
              +
            </button>
          </div>
          {this.state.render ? (
            <div className="modal">
              <div className="buttonWrapper">
                <button
                  onClick={this.handleClick}
                  type="button"
                  className="closeModal"
                >
                  <img src={back} alt="back-arrow" />
                </button>
              </div>
              <>
                <form
                  className="form_add"
                  onSubmit={this.submitDiaryAddProduct}
                >
                  <input
                    className="input_add-product"
                    placeholder="Введите название продукта"
                    name="inputValue"
                    value={this.state.inputValue}
                    onChange={this.inputHandlerDiaryAddProduct}
                    required
                  />
                  {filterList.length > 0 && (
                    <FilterList
                      list={filterList}
                      handleClickLi={this.filterListClickLi}
                    />
                  )}
                  <input
                    className="input_add-gramm"
                    placeholder="Грамм"
                    value={this.state.weight}
                    onChange={this.inputHandlerDiaryAddGramm}
                    required
                  />
                  {window.innerWidth < 768 ? (
                    <button className="button svg-add" type="submit">
                      Добавить
                    </button>
                  ) : (
                    <button className="button svg-add" type="submit">
                      <PlusIcon width="14" height="14" fill="white" />
                    </button>
                  )}
                </form>
              </>
            </div>
          ) : null}
        </DiaryStyled>
      );
    } else {
      return (
        <DiaryStyled>
          <DiaryCalendar
            setSelectedData={this.setSelectedData}
            getCurentDayInfoOperation={this.props.getCurentDayInfoOperation}
          />
          <form className="form_add" onSubmit={this.submitDiaryAddProduct}>
            <input
              className="input_add-product"
              placeholder="Введите название продукта"
              name="inputValue"
              value={this.state.inputValue}
              onChange={this.inputHandlerDiaryAddProduct}
              required
            />
            {filterList.length > 0 && (
              <FilterList
                list={filterList}
                handleClickLi={this.filterListClickLi}
              />
            )}

            <input
              className="input_add-gramm"
              placeholder="Грамм"
              value={this.state.weight}
              onChange={this.inputHandlerDiaryAddGramm}
              required
            />
            {window.innerWidth < 768 ? (
              <button className="button svg-add" type="submit">
                Добавить
              </button>
            ) : (
              <button className="button svg-add" type="submit">
                <PlusIcon width="14" height="14" fill="white" />
              </button>
            )}
          </form>
        </DiaryStyled>
      );
    }
  }
}

const mapStateToPtops = (state) => ({
  productVariables: state.userDiary.user.productsFound,
  error: state.error,
});
const mapDispatchToProps = (dispatch) => ({
  searchProductOperation: (query) => dispatch(searchProductOperation(query)),
  addNewProductOperation: (product) =>
    dispatch(addNewProductOperation(product)),
  getCurentDayInfoOperation: (date) =>
    dispatch(getCurentDayInfoOperation(date)),
  resetList: () => dispatch(resetList()),
});

export default connect(mapStateToPtops, mapDispatchToProps)(DiaryAddProduct);
