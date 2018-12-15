import React from "react";
import NavBar from "../navbar/navbar.component.js";
import "./contact.css";
//components
import SwordVoice from "../general/swordVoice/swordVoice.component.js";
import axios from "axios";
//services

export default class ContactComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  eliminarUser = () => {
    axios
      .delete("/api/users/a")
      .then(res => {
        if (res.status === 200) {
          alert("delete Successful");
        }
      })
      .catch(err => {
        alert(`There was an error status:  ${err}`);
      });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="fila contenedorTest">
          <div className="colorFondoTest grid col-10 col-2-md col-12-sm">
            <SwordVoice delay={2} />
            <p>
              <span>hola</span>
              <button onClick={this.eliminarUser}>Eliminar user a</button>
            </p>

            <div
              style={{
                width: "50%",
                height: "128px",
                overflow: "hidden"
              }}
            >
              <p>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Molestiae nesciunt eaque est voluptas facere itaque commodi
                saepe atque possimus, aliquid vel molestias sapiente quos optio,
                quia quam. Aspernatur, nostrum, veniam. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Molestiae nesciunt eaque est
                voluptas facere itaque commodi saepe atque possimus, aliquid vel
                molestias sapiente quos optio, quia quam. Aspernatur, nostrum,
                veniam. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Molestiae nesciunt eaque est voluptas facere itaque
                commodi saepe atque possimus, aliquid vel molestias sapiente
                quos optio, quia quam. Aspernatur, nostrum, veniam. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Molestiae nesciunt
                eaque est voluptas facere itaque commodi saepe atque possimus,
                aliquid vel molestias sapiente quos optio, quia quam.
                Aspernatur, nostrum, veniam. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Molestiae nesciunt eaque est
                voluptas facere itaque commodi saepe atque possimus, aliquid vel
                molestias sapiente quos optio, quia quam. Aspernatur, nostrum,
                veniam. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Molestiae nesciunt eaque est voluptas facere itaque
                commodi saepe atque possimus, aliquid vel molestias sapiente
                quos optio, quia quam. Aspernatur, nostrum, veniam.
              </p>
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
