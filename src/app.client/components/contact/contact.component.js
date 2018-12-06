import React from "react";
import NavBar from "../navbar/navbar.component.js";
import "./contact.css";
//components
import SwordVoice from "../general/swordVoice/swordVoice.component.js";
import MyScrollBar from "../general/myScrollBar/myScrollbar.component";

export default class ContactComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="fila contenedorTest">
          <div className="colorFondoTest grid col-10 col-2-md col-12-sm">
            <SwordVoice delay={2} />
            <p>
              <span>hola</span>
            </p>

            <div
              style={{
                width: "50%",
                height: "128px",
                overflow: "hidden"
              }}
            >
              <MyScrollBar
                scrollWidth={5}
                barWidth={8}
                className="contactScrollBar"
              >
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Molestiae nesciunt eaque est voluptas facere itaque commodi
                  saepe atque possimus, aliquid vel molestias sapiente quos
                  optio, quia quam. Aspernatur, nostrum, veniam. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit. Molestiae
                  nesciunt eaque est voluptas facere itaque commodi saepe atque
                  possimus, aliquid vel molestias sapiente quos optio, quia
                  quam. Aspernatur, nostrum, veniam. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Molestiae nesciunt eaque est
                  voluptas facere itaque commodi saepe atque possimus, aliquid
                  vel molestias sapiente quos optio, quia quam. Aspernatur,
                  nostrum, veniam. Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Molestiae nesciunt eaque est voluptas facere
                  itaque commodi saepe atque possimus, aliquid vel molestias
                  sapiente quos optio, quia quam. Aspernatur, nostrum, veniam.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Molestiae nesciunt eaque est voluptas facere itaque commodi
                  saepe atque possimus, aliquid vel molestias sapiente quos
                  optio, quia quam. Aspernatur, nostrum, veniam. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit. Molestiae
                  nesciunt eaque est voluptas facere itaque commodi saepe atque
                  possimus, aliquid vel molestias sapiente quos optio, quia
                  quam. Aspernatur, nostrum, veniam.
                </p>
              </MyScrollBar>
            </div>
          </div>
          <aside className="colorFondoAside grid col-2 col-10-md col-12-sm">
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestiae nesciunt eaque est voluptas facere itaque commodi saepe
              atque possimus, aliquid vel molestias sapiente quos optio, quia
              quam. Aspernatur, nostrum, veniam.
            </p>
          </aside>
        </div>
      </div>
    );
  }
}
