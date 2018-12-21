import React from "react";
import NavBar from "../navbar/navbar.component.js";
import axios from "axios";
//CSS
import "./contact.css";
//components
import SwordVoice from "../general/swordVoice/swordVoice.component.js";
import Summary2 from "../blog/common/summary/summary2.component";
//services

//assets
import avatarImg from "../../assets/img/general/avatar.jpg";
import newPostImg from "../../assets/img/blog/newPost.jpg";

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
    const mockData = [
      {
        articleProps: {
          image: newPostImg,
          title: "Magnus Carlsen Campeón del mundo de ajedrez 2018",

          summaryText: `<p>Visual Hierarchy has become one of the most important concept in modern design.</p>
						<p>Today we are going to learn how to apply these concepts and techniques to our favorite typography. Come and check it out!!!.</p>`,

          author: "Jainer Muñoz",
          date: "August, 21 2018",
          authorAvatar: avatarImg,
          categories: [
            {
              category: "Desing"
            },
            {
              category: "UX/UI"
            },
            {
              category: "Web"
            },
            {
              category: "Mobile"
            }
          ]
        }
      }
    ];

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
          <Summary2
            textHTML={mockData[0].articleProps.summaryText}
            keywords={mockData[0].articleProps.categories}
            date={mockData[0].articleProps.date}
            avatar={mockData[0].articleProps.authorAvatar}
            author={mockData[0].articleProps.author}
            width={387}
            height={401}
          />
        </div>
      </div>
    );
  }
}
