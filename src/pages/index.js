import React from 'react';
import Layout from '@theme/Layout';
import { Chrono } from 'react-chrono';
import Navbar from '@theme/Navbar';
import clsx from 'clsx';
import data from './data';
import useThemeContext from '@theme/hooks/useThemeContext';

function Content(props) {
  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '1rem calc(1rem + 5vw)',
        padding: '1rem',
        // border: '7px solid #c5a103',
        borderRadius: '5px',
      }}
    >
      <h2 class="text--center">{props.name}</h2>
      <p class="text--justify">{props.text}</p>
    </div>
  );
}

function Headline(props) {
  const { isDarkTheme } = useThemeContext();
  return (
    <div
      style={
        isDarkTheme
          ? {
              width: '100%',
              height: '400px',
              marginBottom: '1rem',
              padding: '1rem',
              background:
                'radial-gradient(circle, rgba(222,222,222,1) 0%, rgba(207,171,17,1) 58%, rgba(197,161,3,1) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
            }
          : {
              width: '100%',
              height: '400px',
              marginBottom: '1rem',
              padding: '1rem',
              background:
                'radial-gradient(circle, rgba(255,255,255,1) 1%, rgba(254,208,8,1) 55%, rgba(197,161,3,1) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }
      }
    >
      <img
        src="/img/pivovar-animated.svg"
        style={{
          width: '240px',
          height: '280px',
        }}
        alt="pivovar animated"
      />
      <h1 class="text--center margin-top--sm">{props.title}</h1>
    </div>
  );
}
function TeamMember(props) {
  const { isDarkTheme } = useThemeContext();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <img
        src={props.image}
        style={{
          width: '240px',
          height: '280px',
          objectFit: 'cover',
          margin: '2rem 3rem',
          borderRadius: '5px',
          objectPosition: props.position,
          boxShadow: '8px 10px 10px rgb(254,208,8,0.8)',
        }}
        alt={props.name}
      />
      <h3
        style={
          isDarkTheme
            ? {
                position: 'absolute',
                top: '10px',
                left: '0px',
                width: '106px',
                borderRadius: '5px',
                wordSpacing: '1000px',
                padding: '0.3rem',
                background: '#c5a103',
              }
            : {
                position: 'absolute',
                top: '10px',
                left: '0px',
                width: '106px',
                borderRadius: '5px',
                wordSpacing: '1000px',
                padding: '0.3rem',
                background: 'rgb(254,208,8)',
                // textShadow: '2px 2px 3px black', }
              }
        }
        class="text--center"
      >
        {props.name}
      </h3>
      <p class="text--italic size--lg">{props.text}</p>
    </div>
  );
}

function TeamMembers() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1200px',
      }}
    >
      <TeamMember
        name="Michal Valiček"
        text="The Boss"
        image="/img/team_members/michalV.jpg"
        position="top"
      />
      <TeamMember
        name="Alexandra Frniaková"
        text="Grafické rozhranie a zápisy"
        image="/img/team_members/marekK.jpg"
        position="center"
      />
      <TeamMember
        name="Marek Krchňavý"
        text="Databázy a backend"
        image="/img/team_members/marekK.jpg"
        position="center"
      />
      <TeamMember
        name="Michaela Nemcová"
        text="Grafické rozhranie a dizajn"
        image="/img/team_members/miska.jpg"
        position="top"
      />
      <TeamMember
        name="Lukáš Novota"
        text="Testovanie a backend"
        image="/img/team_members/lukas.jfif"
        position="right"
      />
      <TeamMember
        name="Peter Stríž"
        text="Scrum master a IoT Moduly"
        image="/img/team_members/peto.jfif"
        position="left"
      />
      <TeamMember
        name="Marek Vajda"
        text="Backend a IoT zariadenia"
        image="/img/team_members/marek.jfif"
        position="center"
      />
    </div>
  );
}

function Timeline() {
  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 calc(1rem + 5vw)',
      }}
    >
      <Chrono
        items={data}
        theme={{
          primary: '#c5a103',
        }}
        mode="VERTICAL_ALTERNATING"
        scrollable
        // slideShow
        // useReadMore={false}
        // flipLayouts
        hideControls
      >
        <div className="chrono-icons">
          <img src="../../static/img/beer.png" alt="pivo" />
        </div>
      </Chrono>
    </div>
  );
}

export default function TeamPage() {
  return (
    <Layout>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Headline title="SmartBrew - Tím 6" />
        <Content
          name="IoT platforma na priemyselnú automatizáciu - malý pivovar"
          text="Cieľom projektu je vytvoriť ucelené riešenie na automatizovanie procesov v priemysle. Projekt je vykonávaný v spolupráci so Strojníckou fakultou STU, ktorá z veľkej časti zastrešuje materiálne požiadavky. Využívajú sa dve prepojené nádoby, pričom v každej prebieha iná fáza varenia. Naša práca bude prebiehať nad údajmi z pivovaru, konkrétne nad rôznymi efektormi (motory, násypníky, ventily...) a senzormi (teplomer, tlakomer...). Centrálnym komponentom systému je Raspberry Pi, ktoré bude poskytovať zázemie pre sieť senzorov a efektorov. Automatizovaná výroba piva pozostáva z pridania nového receptu (respektíve výberu už existujúceho receptu), procesu výroby piva, priebežného zobrazovania priebehu varenia a vytvorenia zápisu o ukončenom procese."
        />
        <h2 class="text--center">Členovia tímu</h2>
        <TeamMembers />
        <Content
          name="O nášom tíme"
          text="Našou prioritou je vytvorenie produktu, ktorý bude kvalitný a dobre použiteľný v praxi, a pritom sa niečo nové naučiť. Tímu nechýba organizovanosť, schopnosť komunikovať a prezentovať svoje nápady a znalosť zostavovania zrozumiteľnej dokumentácie. K povinnostiam pristupujeme svedomito a zakladáme si na dobrej tímovej spolupráci.Máme široký rozsah vedomostí pokiaľ ide o technológie vhodné k riešeniu tohto projektu. Jedná sa teda o webové aplikácie a technológie ako JavaScript, PHP, React, Angular, Node.js, HTML5 a CSS3, ale aj platformy Raspberry Pi či Arduino, a databázové systémy."
        />
        <h2 class="text--center">Časová os</h2>
        <Timeline />
      </div>
    </Layout>
  );
}
