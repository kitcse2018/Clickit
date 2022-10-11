import Header from "../../components/Headers/Header";
import {Container} from "reactstrap";

const UserView = () =>{
    return(
        <>
            <Header/>
            <Container className={"userView"}>
                <div class = {"fac-box"}>
                    <div class={"fac-left"}>
                        <div class ={"fac-img"}>
                            <img
                                alt="..."
                                className="fac-img-detail"
                                src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                /*이미지는 보니깐 디비에 저장된사진의 위치 url을 보내고 여기서 가져와야할듯 */
                            />
                        </div>
                    </div>

                    <div class={"fac-right"}>
                        <div class ={"fac-name"}>
                            <h2>체력 단련실</h2>
                        </div>
                        <div class={"fac-content"}>
                            <ul class={"fac-content-detail"}>
                                <li class={"fac-content-detail-name"}>
                                    제한 인원 -4
                                </li>
                                <li className={"fac-content-detail-time"}>
                                    이용 가능 시간 - 00:00 ~ 23:59
                                </li>
                            </ul>
                        </div>
                        <div class={"fac-status"}>
                            <p>예약 현황 2/4 </p>
                        </div>
                        <div class={"fac-reserve"}>
                            <button class={"fac-reserve-button"}>
                                예약하기
                            </button>
                        </div>
                    </div>

                </div>
            </Container>
        </>
    )
}
export default UserView;