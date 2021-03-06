import React from 'react';
import Layout from '@theme/Layout';
import { Chrono } from 'react-chrono';
import { sprints } from '../../static/sprints';
import Link from '@docusaurus/Link';
import useThemeContext from '@theme/hooks/useThemeContext';

function Content(props) {
  return (
    <div
      className={props.className}
      style={{
        maxWidth: '1000px',
        margin: '1rem calc(1rem + 5vw)',
        padding: '1rem',
        // border: '7px solid #c5a103',
        borderRadius: '5px',
      }}
    >
      <h2 className="text--center">{props.name}</h2>
      <p className="text--justify">{props.text}</p>
    </div>
  );
}

function LargeImage(props) {
  const { isDarkTheme } = useThemeContext();
  return (
    <div
      className={props.className}
      style={{
        maxWidth: '1000px',
        margin: '2rem calc(1rem + 5vw)',
        marginTop: '-2rem',
        padding: '1rem',
        borderRadius: '5px',
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
          width: '100%',
          height: '100%',
          maxHeight: '450px',
          objectFit: 'cover',
          margin: '2rem 3rem',
          borderRadius: '5px',
          boxShadow: '5px 5px 10px rgb(254,208,8,0.8)',
        }}
        alt={props.name}
      />
      <h3
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '0 auto',
          width: '300px',
          borderRadius: '5px',
          padding: '0.5rem',
          background: isDarkTheme ? '#c5a103' : 'rgb(254,208,8)',
        }}
        className="text--center"
      >
        {props.title}
      </h3>
    </div>
  );
}

function Headline(props) {
  const { isDarkTheme } = useThemeContext();
  return (
    <div
      style={{
        width: '100%',
        height: '400px',
        marginBottom: '1rem',
        padding: '1rem',
        background: isDarkTheme
          ? 'radial-gradient(circle, rgba(222,222,222,1) 0%, rgba(207,171,17,1) 58%, rgba(197,161,3,1) 100%)'
          : 'radial-gradient(circle, rgba(255,255,255,1) 1%, rgba(254,208,8,1) 55%, rgba(197,161,3,1) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: isDarkTheme ? 'black' : '',
      }}
    >
      <img
        src="/img/pivovar-animated.svg"
        style={{
          width: '240px',
          height: '280px',
        }}
        alt="pivovar animated"
      />
      <h1 className="text--center margin-top--sm">{props.title}</h1>
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
          boxShadow: '5px 5px 10px rgb(254,208,8,0.8)',
        }}
        alt={props.name}
      />
      <h3
        style={{
          position: 'absolute',
          top: '10px',
          left: '0px',
          width: '106px',
          borderRadius: '5px',
          wordSpacing: '1000px',
          padding: '0.3rem',
          background: isDarkTheme ? '#c5a103' : 'rgb(254,208,8)',
        }}
        className="text--center"
      >
        {props.name}
      </h3>
      <p className="text--italic size--lg">{props.text}</p>
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
        name="Michal Vali??ek"
        text="The Boss"
        image="/img/team_members/michalV.jpg"
        position="top"
      />
      <TeamMember
        name="Alexandra Frniakov??"
        text="Grafick?? rozhranie a z??pisy"
        image="/img/team_members/alexandra.jpg"
        position="center"
      />
      <TeamMember
        name="Marek Krch??av??"
        text="Datab??zy a backend"
        image="/img/team_members/marekK.jpg"
        position="center"
      />
      <TeamMember
        name="Michaela Nemcov??"
        text="Grafick?? rozhranie a dizajn"
        image="/img/team_members/miska.jpg"
        position="top"
      />
      <TeamMember
        name="Luk???? Novota"
        text="Testovanie a backend"
        image="/img/team_members/lukas.jfif"
        position="right"
      />
      <TeamMember
        name="Peter Str????"
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
  const { isDarkTheme } = useThemeContext();

  const [theme, setTheme] = React.useState({});

  React.useEffect(() => {
    setTheme({
      primary: 'var(--ifm-color-primary)',
      cardBgColor: isDarkTheme
        ? 'var(--ifm-color-emphasis-200)'
        : 'var(--ifm-background-surface-color)',
      cardForeColor: 'var(--ifm-color-font)',
    });
  }, [isDarkTheme]);

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 calc(1rem + 5vw)',
      }}
    >
      <Chrono
        items={sprints}
        theme={theme}
        mode="VERTICAL_ALTERNATING"
        useReadMore={false}
        hideControls
      >
        <div className="chrono-icons">
          {sprints.map((sprint) => (
            <img key={sprint.title} src="/img/beer.png" alt="pivo" />
          ))}
        </div>
        {sprints.map((sprint, index) => (
          <div
            key={sprint.title + 'text'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                marginBlockEnd: '0.5em',
              }}
            >
              {sprint.cardDetailedText}
            </p>

            <Link
              to={`/docs/project/sprints/${String(index + 1).padStart(2, '0')}`}
            >
              Viac info
            </Link>
          </div>
        ))}
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
        <Headline title="SmartBrew - T??m 6" />

        <Content
          name="IoT platforma na priemyseln?? automatiz??ciu - mal?? pivovar"
          text="Cie??om projektu je vytvori?? ucelen?? rie??enie na automatizovanie procesov v priemysle. Projekt je vykon??van?? v spolupr??ci so Strojn??ckou fakultou STU, ktor?? z ve??kej ??asti zastre??uje materi??lne po??iadavky. Vyu????vaj?? sa dve prepojen?? n??doby, pri??om v ka??dej prebieha in?? f??za varenia. Na??a pr??ca bude prebieha?? nad ??dajmi z pivovaru, konkr??tne nad r??znymi efektormi (motory, n??sypn??ky, ventily...) a senzormi (teplomer, tlakomer...). Centr??lnym komponentom syst??mu je Raspberry Pi, ktor?? bude poskytova?? z??zemie pre sie?? senzorov a efektorov. Automatizovan?? v??roba piva pozost??va z pridania nov??ho receptu (respekt??ve v??beru u?? existuj??ceho receptu), procesu v??roby piva, priebe??n??ho zobrazovania priebehu varenia a vytvorenia z??pisu o ukon??enom procese."
        />

        <LargeImage image="/img/pivovar.jpeg" title="MightyBrewer 3000" />

        <h2 className="text--center">??lenovia t??mu</h2>
        <TeamMembers />

        <Content
          name="O n????om t??me"
          text="Na??ou prioritou je vytvorenie produktu, ktor?? bude kvalitn?? a dobre pou??ite??n?? v praxi, a pritom sa nie??o nov?? nau??i??. T??mu nech??ba organizovanos??, schopnos?? komunikova?? a prezentova?? svoje n??pady a znalos?? zostavovania zrozumite??nej dokument??cie. K povinnostiam pristupujeme svedomito a zaklad??me si na dobrej t??movej spolupr??ci. M??me ??irok?? rozsah vedomost?? pokia?? ide o technol??gie vhodn?? k rie??eniu tohto projektu. Jedn?? sa teda o webov?? aplik??cie a technol??gie ako JavaScript, PHP, React, Angular, Node.js, HTML5 a CSS3, ale aj platformy Raspberry Pi ??i Arduino, a datab??zov?? syst??my."
        />

        <h2 className="text--center">??asov?? os</h2>
        <Timeline />

        <Content
          className="theme-doc-markdown"
          name="Dokument??cia"
          text={
            <>
              V??etky dokumenty s?? umiesten?? na na??ej dokument??ci??. Je to na??a
              banka ??dajov a osved??ila sa aj v??aka tomu, ??e je k nej jednoduch??
              pr??stup, jednoduch?? vytv??ranie nov??ch pr??spevkov a a hlavne sa d??
              jednoducho preh??ad??va??.{' '}
              <Link to="/docs"> Prejs?? do dokument??cie</Link>.
            </>
          }
        />

        <h2 className="text--center">Poster</h2>

        <div
          style={{
            width: '100%',
            maxWidth: '1000px',
            margin: '1rem calc(2rem + 5vw)',
            borderRadius: '5px',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <img
            src="/assets/Poster.png"
            title="Poster"
            style={{
              width: '100%',
            }}
            loading="lazy"
          />
        </div>
      </div>
    </Layout>
  );
}
