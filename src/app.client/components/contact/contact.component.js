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
          <svg
            viewBox="0 0 1439 888"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-1.99988 0V891C-1.99988 891 5.4635 816.086 21.0129 714.11C44.6981 558.779 87.1444 340.659 150.553 228.865C255.589 43.6765 541.188 0 1439 0H-1.99988Z"
              fill="white"
            />
          </svg>

          <svg
            viewBox="0 0 1439 888"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1439 891V0C1439 0 1431.54 74.9139 1415.99 176.89C1392.3 332.221 1349.86 550.341 1286.45 662.135C1181.41 847.324 895.812 891 -2 891H1439Z"
              fill="white"
            />
          </svg>

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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestiae nesciunt eaque est voluptas facere itaque commodi saepe
              atque possimus, aliquid vel molestias sapiente quos optio, quia
              quam. Aspernatur, nostrum, veniam.
            </p>
          </aside>
          {/* <Summary2
            textHTML={mockData[0].articleProps.summaryText}
            keywords={mockData[0].articleProps.categories}
            date={mockData[0].articleProps.date}
            avatar={mockData[0].articleProps.authorAvatar}
            author={mockData[0].articleProps.author}
            width={387}
            height={401}
          /> */}
        </div>
      </div>
    );
  }
}
