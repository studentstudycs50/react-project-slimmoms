import { Component } from "react";
import DiaryAddProduct from "../components/Diary/DiaryAddProduct";
import DiaryCalendar from "../components/Diary/DiaryCalendar";
import DiaryList from "../components/Diary/DiaryList";
import DiaryStyle from "../components/Diary/DiaryStyled";
import CalculatorPageDecoration from '../components/decoration/CalculatorPageDecoration';

class Diary extends Component {

    render() {
        return (
            <DiaryStyle>
                <DiaryCalendar />
                <DiaryAddProduct />
                <DiaryList />
                <CalculatorPageDecoration />
            </DiaryStyle>
        );
    }
}

export default Diary;

