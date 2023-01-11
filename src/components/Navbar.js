import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import axios from "axios";
import ROUTES from "../constants.js";

import UserContext from "../contexts/userContext.js";

export default function Navbar() {
  const { user, setUser, token, setToken } = useContext(UserContext);
  const [showLogout, setshowLogout] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  console.log(searchResult);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (search.length < 3) {
      setSearchResult([]);
    } else {
      searchUser();
    }
  }, [search]);

  async function searchUser() {
    const { data } = await axios.post(
      `${ROUTES.URL}/search`,
      { search },
      config
    );
    setSearchResult(data);
  }

  async function logout() {
    await Swal.fire({
      position: "center",
      background: "#151515",
      icon: "question",
      title: "Do you really want to exit the application?",
      showCancelButton: true,
      cancelButtonText: "Not",
      confirmButtonText: "Yes, I want to leave",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("Linkr");
        setUser();
        setToken();
        navigate("/");
      } else {
        setshowLogout(false);
      }
    });
  }

  function goToProfile(id) {
    navigate(`/user/${id}`);
  }

  return (
    <Container>
      <Logo onClick={() => navigate("/timeline")}>linkr</Logo>
      <SearchArea>
        <DebounceInput
          element={InputArea}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          minLength={3}
          debounceTimeout={300}
          placeholder={"Search for people and friends"}
        />
        <ul>
          {searchResult.length != 0
            ? searchResult.map(({ id, picture, username, follows }) => {
                return (
                  <SearchResult onClick={() => goToProfile(id)} key={id}>
                    <img src={picture} alt="User" />
                    {username}
                    {follows? <p>• following</p> : null}
                  </SearchResult>
                );
              })
            : null}
        </ul>
      </SearchArea>

      {user ? (
        <Profile
          title={showLogout ? "Close options" : "Show options"}
          onClick={() => setshowLogout(!showLogout)}
        >
          {showLogout ? <SlArrowUp /> : <SlArrowDown />}
          <img src={user?.picture} alt={`${user?.username} photo`} />
          {showLogout ? (
            <Logout title="Logout" onClick={logout}>
              <button>Logout</button>
            </Logout>
          ) : (
            <></>
          )}
        </Profile>
      ) : (
        <Profile></Profile>
      )}

      {showLogout ? (
        <Close
          showLogout={showLogout}
          onClick={() => setshowLogout(!showLogout)}
        />
      ) : (
        <></>
      )}
    </Container>
  );
}

const Container = styled.nav`
  width: 100%;
  height: 72px;
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 18px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

const Logo = styled.span`
  font-family: "Passion One", cursive;
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;
  color: #ffffff;
  padding: 0px 10px;
  cursor: pointer;
`;

const InputArea = styled.input`
  width: 100%;
  border-radius: 8px;
  background-color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  position: relative;
  border: none;
  outline: none;
  ::placeholder {
    display: flex;
    justify-content: space-between;
    color: #c6c6c6;
    font-size: 19px;
  }
  &:focus {
    outline: none;
    border-radius: 8px 8px 0 0;
  }
`;

const SearchArea = styled.div`
  position: relative;
  width: 400px;
  height: 45px;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: auto;
    position: absolute;
    width: 100%;
    li:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
  @media (max-width: 610px) {
    position: absolute;
    top: 85px;
    width: 95%;
    left: auto;
    right: auto;
  }
`;

const SearchResult = styled.li`
  cursor: pointer;
  width: 100%;
  background-color: #e7e7e7;
  height: 55px;
  padding: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #515151;
  font-family: "Lato", sans-serif;
  font-size: 19px;
  font-weight: 400;
  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  p {
    color: #c5c5c5;
    font-size: 19px;
    margin-left: 5px;
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
  }

  svg {
    color: #ffffff;
    font-size: 20px;
    margin-right: 17px;
  }
`;

const Logout = styled.div`
  width: 150px;
  height: 47px;
  background-color: #171717;
  border-radius: 0px 0px 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 72px;
  right: 0px;
  z-index: 2;
  animation: entry 1s ease 0s 1 normal forwards;
  cursor: pointer;

  &:hover {
    filter: brightness(130%);
  }

  button {
    width: 100%;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #ffffff;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  @keyframes entry {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Close = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: default;
`;
