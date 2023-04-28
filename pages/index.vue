<template>
    <h1 class="title">Información sobre la encuesta de seguridad informática</h1>

    <div class="card">
        <h3>Descripición</h3>

        <p>
            En esta encuesta recolectamos las prácticas de seguridad cumplidas por los encuestados
            (actualizar sus contraseñas regularmente, usar Wi-Fi público, antivirus, etc).
            Observamos cuánto se cumple cada práctica, así como cuántas prácticas se cumplen por
            grupo etario y a partir de ellos sacamos nuestras conclusiones. <!-- Por un lado
            analizaremos los resultados generales, y por otro los resultados según
            grupos etarios.-->
        </p>
    </div>

    <div class="card">
        <h3>Objetivos</h3>

        <p>
            Con estos datos queremos analizar el estado del paradigma de la seguridad informática personal en Argentina,
            para posteriormente poder informar a la población sobre los distintos métodos disponibles para prevenir los
            diversos
            ataques electrónicos de los que podrían ser víctimas.
        </p>
    </div>

    <div class="card">
        <h3>Datos adicionales</h3>
        <ul>
            <li><b>Equipo de investigación:</b> Grupo ISECA.</li>

            <li><b>Muestra:</b> Grupo de alrededor de 200 encuestados online de Argentina.</li>

            <li><b>Método de recolección de datos:</b> Encuestas electrónicas.</li>

            <li><b>Fecha de publicación de la encuesta:</b> 17/04/2023.</li>

            <li><b>Fecha de finalización de la encuesta:</b> 23/04/2023.</li>
        </ul>
    </div>

    <div class="card">
        <h3>Consideraciones</h3>
        <p>
            Debido a la reducida cantidad de encuestados, no podemos garantizar que los resultados y
            las conclusiones sean completamente fieles a la realidad ni representativos de toda la población.
            Sin embargo, creemos que son suficientes datos como para poder sacar conlusiones y consideramos la
            posiblidad de reabrir la encuesta en un futuro, posiblemente con más preguntas y difundiéndola a
            un grupo más numeroso de personas.
        </p>
    </div>

    <main>
        <h1 class="title">Resultados de la encuesta de seguridad informática</h1>
        <br><br><br><br><br>
        <h2>Cantidad De Personas Encuestadas Por Edad</h2>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="participantsByAge"
                :options="{ ...participantsByAge, animation: graphAnimations[0] }"
                :ref="el => { if (el) graphRefs[0] = el }" />
        </div>
        <div class="centered">
            <ChartAgeRefs></ChartAgeRefs>
        </div>
        <br><br><br><br><br>

        <h2>Seguridad de cuentas personales</h2>
        <h3>
            Porcentaje de buenas prácticas de seguridad de cuentas personales que sigue la gente
            (por edad):
        </h3>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="accountSecurityByAgeData"
                :options="{ ...barOptions, animation: graphAnimations[0] }" :ref="el => { if (el) graphRefs[0] = el }" />
        </div>
        <div class="centered">
            <ChartAgeRefs></ChartAgeRefs>
        </div>
        <br><br><br><br><br>

        <h3>
            Porcentaje de buenas prácticas de seguridad de cuentas personales que sigue la gente (por práctica):
        </h3>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="accountSecurityByMeasurePercentage"
                :options="{ ...barOptions, animation: graphAnimations[1] }" :ref="el => { if (el) graphRefs[1] = el }" />
        </div>
        <div class="centered">
            <p>
                <b>Referencia:</b>
                <br>
                <span v-for="data in Object.entries(accMesaureMap)">
                    {{ data[0] }} - {{ data[1] }}
                    <br>
                </span>
            </p>
        </div>

        <br><br><br><br><br><br><br>

        <h2>Otras prácticas de seguridad</h2>
        <h3>
            Porcentaje de otras prácticas de seguridad que emplea la gente (por edad):
        </h3>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="otherSecurityByAgeData"
                :options="{ ...barOptions, animation: graphAnimations[2] }" :ref="el => { if (el) graphRefs[2] = el }" />
        </div>
        <div class="centered">
            <ChartAgeRefs></ChartAgeRefs>
        </div>


        <br><br><br><br><br>

        <h3>
            Porcentaje de otras prácticas de seguridad que emplea la gente (por práctica):
        </h3>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="otherSecurityByMeasurePercentage"
                :options="{ ...barOptions, animation: graphAnimations[3] }" :ref="el => { if (el) graphRefs[3] = el }" />
        </div>
        <div class="centered">

            <p>
                <b>Referencia:</b>
                <br>
                <span v-for="data in Object.entries(secMesaureMap)">
                    {{ data[0] }} - {{ data[1] }}
                    <br>
                </span>
            </p>
        </div>

        <br><br><br><br><br><br><br>



        <!--  <h2>Porcentaje de cómo cree la gente que roban las cuentas</h2>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="chartData['¿Tenés contraseñas variadas?']"
                :options="{ ...barOptions, animation: graphAnimations[4] }" />
        </div>

        <br><br><br><br><br><br><br> -->

        <h2>Porcentaje de personas a cuyas cuenta accedieron sin permiso:</h2>
        <div class="graphContainer">
            <Pie class="graph" :data="unuauthorizedAccountAccessData" :options="pieOptions" />
        </div>

        <br><br><br><br><br><br><br>

        <h2>Buenas prácticas seguidas en total</h2>
        <h3>
            Porcentaje de buenas prácticas seguidas en total (por edad):
        </h3>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="generalSecurityByAgeData"
                :options="{ ...barOptions, animation: graphAnimations[6] }" />
        </div>
        <div class="centered">

            <ChartAgeRefs></ChartAgeRefs>
        </div>

        <br><br><br><br><br>

        <h3>Datos adicionales</h3>
        <b>Medidas de tendencia central:</b>
        <ul>
            <li>La media de edad es: 26,58</li>
            <li>La moda de edad es: 18-29</li>
            <li>La mediana de edad es: 23,5</li>
        </ul>

        <b>Medidas de dispersión:</b>
        <ul>
            <li>El rango de edad es: 76</li>
            <li>La varianza de edad es: 270,09</li>
            <li>El desvio estandar de edad es: 16,43</li>
            <li>El coeficiente de variación de edad es: 61,83%</li>
        </ul>





        <h3>conclusiones</h3>
        <p>En base a todos estos datos, concluímos que es necesario educar y concientizar más sobre la importancia de la
            privacidad y seguridad online, sobre todo a las generaciones más jóvenes.

            En la actualidad, puede resultar un tanto difícil esto, ya que muchas personas utilizan las redes sociales como
            una forma de entretenimiento sin considerar los riesgos asociados y no tienen interés por informarse respecto a
            prácticas de seguridad. A menudo, las personas dicen que no les importa su privacidad, pero luego se sorprenden
            o preocupan cuando alguien accede a su cuenta o sabe demasiado sobre ellos. Aún así, tomaremos en cuenta lo
            observado para informar, por lo menos a nuestros círculos más cercanos sobre el tema.</p>

        <!--      <h3>
            Porcentaje de buenas prácticas seguidas en total (por práctica):
        </h3>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="generalSecurityByMeasurePercentage"
                :options="{ ...barOptions, animation: graphAnimations[7] }" />
        </div> -->
    </main>
</template>

<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement
} from 'chart.js'
import { Pie, Bar } from 'vue-chartjs'
import { barOptions, pieOptions } from '../composables/graphOptions.ts'
import { toRaw } from 'vue';
import ChartAgeRefs from '../components/ChartAgeRefs.vue'
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

ChartJS.defaults.color = "white"
ChartJS.defaults = "white"

const secMesaureMap = {
    "A": "¿Usás Antivirus?",
    "B": "¿Corroborás que la barra de navegación tenga el candado?",
    "C": "¿Usás Wi-Fi público?"
}

const accMesaureMap = {
    "A": "¿Actualizás tus contraseñas regularmente?",
    "B": "¿Tenés contraseñas variadas?",
    "C": "¿Sabés lo que es la autenticación de dos factores?",
    "D": "¿Ignorás mails sospechosos?"
}


const percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomColor() {
    const color = { r: getRandomInt(256), g: getRandomInt(256), b: getRandomInt(256) }
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}
function getColorForPercentage(pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    const lower = percentColors[i - 1];
    const upper = percentColors[i];
    const range = upper.pct - lower.pct;
    const rangePct = (pct - lower.pct) / range;
    const pctLower = 1 - rangePct;
    const pctUpper = rangePct;
    const color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    // or output as hex if preferred
};


const responseDataNotFormatted = [
    {
        "Marca temporal": 1681117567179,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1681721963455,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1681723503934,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "4chan",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1681723823492,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1681724050840,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1681725831361,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram, twitter",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean, sanjaume ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1681725863109,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1681726234395,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": ".... ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1681726273389,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1681825510283,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1681825652782,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean, sanjaume",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1681825723839,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Instagram, Reddit, 4chan",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola, Te hackean, sanjaume",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1681852742063,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1681852890042,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1681853594863,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682091869664,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Mails engañosos",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682092652631,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram, Reddit, furry feet",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te ven escribiéndola, Te hackean, mac spoofing, session hijacking, cookie takeover, evil twin",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682092942130,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, intercepción de paquetes de red",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682119387725,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682119441649,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682119819561,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682120242030,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Instagram, Reddit, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682120368015,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, qcy, profe aproba a ian",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682120487817,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682120546897,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682120599552,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, roblox",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682120643580,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682120849778,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean, Al colocar datos en paginas sospechas y admitir que aplicaciones vean tu información privada",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682121160291,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Instagram, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682167803710,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682263390198,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682263403981,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682263408630,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682263428020,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682263441638,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola, Te hackean, sanjaume",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682263455358,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682263480325,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682263483717,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682265198827,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682265577267,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682265765041,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682265961774,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682266044089,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682266067954,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682268056916,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682268084261,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682268135308,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682268430173,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682268508035,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682268536631,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682268619429,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682268744743,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682268835936,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682268901286,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hacen escribirla en una pagina engañosa",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682270860896,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Discord",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "no",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682270883080,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682270989964,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682271022958,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682271157119,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean, sanjaume",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682271197030,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Instagram, Tik Tok, sanjaume",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean, sanjaume",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682271452535,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682271500074,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "sanjaume",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682275235268,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682275572267,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "sanjaume",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682275814237,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682275983265,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682276103394,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Discord",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682276415757,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682276710446,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Reddit, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682277478912,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682277879015,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682277930496,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682278191865,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682278263750,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Discord",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682278358219,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Discord",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682278443619,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Discord",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682278547531,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Discord",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682278631520,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Discord",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682278728299,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te ven escribiéndola, Te hackean, sanjaume",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682278781259,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682278830838,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682278880256,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682278929761,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682278979229,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682279028713,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682279078325,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682279127784,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682279177310,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682279219556,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te hackean, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682279769854,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682279818460,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682279866956,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682279969781,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Instagram, Reddit, Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te ven escribiéndola, Te hackean, sanjaume",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682280038671,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Facebook, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682280163482,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682280308701,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682280458474,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682280552987,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682280650780,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682280747726,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te hackean, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682280797458,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682280906513,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682280992596,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682281047531,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682281144587,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682281293065,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682281446131,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682281503095,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682281605694,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682281664266,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682281712844,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682281806977,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682281903992,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Reddit, Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682282049796,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682282099951,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682282241740,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682282298297,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682282353735,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682282406757,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682282505652,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te hackean, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682282660710,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682282754122,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682282813910,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682282962172,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te hackean, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682283069704,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682283202380,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola, Te hackean, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682283303718,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Facebook",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682283366738,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682283419639,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682283512168,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682283608291,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682283717832,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682283812310,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682283870921,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682283965852,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Reddit, Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284070357,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284118448,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682284215406,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682284275526,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284423841,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682284475620,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284537402,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284575841,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Facebook, Discord, Instagram, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284604322,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284646211,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284683922,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "Facebook, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284690318,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284708632,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284773301,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284791402,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284837454,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284888034,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682284903943,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682284957799,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682285003976,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682285020384,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Facebook, Discord, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682285031022,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682285069111,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682285135367,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Facebook, Discord, Instagram, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682285190869,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682285248994,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682285320207,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682285369273,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682285419514,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Facebook, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682285462919,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682285516776,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682285599472,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682285653782,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682285693949,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682285747015,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682285791988,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682285870344,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Instagram, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola, Te hackean, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682285931326,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Instagram, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682285948391,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682285992640,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682286072325,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682286109366,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682286114559,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Discord",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682286164416,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682286211593,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola, Te hackean, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682286318267,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682286393592,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682286445979,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682286533542,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682286580499,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682286634845,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682286747550,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Tik Tok, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682286829103,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682286830168,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Instagram, Reddit, Tik Tok, Pinterest",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682286854807,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Instagram, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682286880333,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean, Rusos",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682286927689,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682286942861,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682286965532,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Facebook, Discord, Instagram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682286986356,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "Discord",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te ven escribiéndola",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682287020171,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Facebook, Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682287026510,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682287040067,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Discord, Instagram, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682287070449,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Instagram, Reddit, Tik Tok, TuMama",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Free bobux",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682287131994,
        "Edad": "Menos de 13",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Tik Tok, Roblox",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean, Jenny la hacker de robloxcz",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682287135925,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682287203033,
        "Edad": "13 a 17",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Instagram, Reddit, Tik Tok",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682287212680,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Azar, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682287250457,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Facebook, Discord, Reddit, Telegram",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Fuerza bruta, Te hackean, Maria esta a 3km de ti",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682287309108,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "No",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682287309434,
        "Edad": "18 a 29",
        "¿Qué redes sociales usás frecuentemente?": "Facebook, Instagram, Tik Tok, Brazzers",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "Si",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te ven escribiéndola, Te hackean",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682287403792,
        "Edad": "Mayor de 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "A veces",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Te hackean, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "No"
    },
    {
        "Marca temporal": 1682287485720,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Facebook, Discord, Reddit, ",
        "¿Actualizás tus contraseñas regularmente?": "No",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "No",
        "¿Corroborás que la barra de navegación tenga el candado?": "No",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Azar, Te ven escribiéndola, Te hackean, ",
        "¿Usás Wi-Fi público?": "No",
        "¿Usás Antivirus?": "No",
        "¿Ignorás mails sospechosos?": "Sí"
    },
    {
        "Marca temporal": 1682287546810,
        "Edad": "30 a 50",
        "¿Qué redes sociales usás frecuentemente?": "Discord, Reddit",
        "¿Actualizás tus contraseñas regularmente?": "Si",
        "¿Tenés contraseñas variadas?": "No",
        "¿Accedieron a tu cuenta sin tu permiso alguna vez?": "Si",
        "¿Corroborás que la barra de navegación tenga el candado?": "Si",
        "¿Sabés lo que es la autenticación de dos factores?": "Sí",
        "¿Cómo pensás que roban las contraseñas?": "Fuerza bruta, Te hackean, ",
        "¿Usás Wi-Fi público?": "Sí",
        "¿Usás Antivirus?": "Sí",
        "¿Ignorás mails sospechosos?": "Sí"
    }
]
const graphAnimations = ref([false, false, false, false, false, false, false])
const responseData = {}
const chartData = {}
const accountSecurityByAgeData = {}
const participantsByAge = {}
const otherSecurityByAgeData = {}
const generalSecurityByAgeData = {}
const accountSecurityByMeasurePercentage = {}
const otherSecurityByMeasurePercentage = {}
const generalSecurityByMeasurePercentage = {}
const unuauthorizedAccountAccesses = [0, 0]
const unuauthorizedAccountAccessData = {}
const graphRefs = ref([])


function reformatData() {
    for (let response of responseDataNotFormatted) {
        for (let [label, value] of Object.entries(response)) {
            if (responseData[label] === undefined) responseData[label] = []
            else responseData[label].push(value)
        }
    }

}

function cleanAndGroupData() {
    for (let [label, responseArr] of Object.entries(responseData)) {
        responseData[label] = responseArr.filter((res) => res !== NaN)

        const responseCount = responseData[label].reduce((acc, curr) => {
            if (!acc[curr]) acc[curr] = 1
            else acc[curr]++
            return acc
        }, {});

        const labels = []
        const data = []

        for (let [response, count] of Object.entries(responseCount)) {
            labels.push(response)
            data.push(count)
        }

        chartData[label] = {
            labels,
            datasets: [{
                data,
                label,
                backgroundColor: ["orange", "yellow", "red", "blue", "brown", "gray"],
            }]
        }
    }
}

function fillAccountSecurityByMeasurePercentage() {
    const passwordRelatedQuestions = ["¿Actualizás tus contraseñas regularmente?", "¿Tenés contraseñas variadas?", "¿Sabés lo que es la autenticación de dos factores?", "¿Ignorás mails sospechosos?"]
    const securityByMeasure = {}

    for (let answer of passwordRelatedQuestions) {
        const labels = chartData[answer].labels
        const responses = chartData[answer].datasets[0].data
        const totalAnswers = responses.reduce((x, y) => x + y)
        securityByMeasure[answer] = 0

        for (var i = 0; i < passwordRelatedQuestions.length; i++) {
            if (labels[i] === "Sí" || labels[i] === "Si") {
                securityByMeasure[answer] += 1 * responses[i]
            } else if (labels[i] === "A veces") {
                securityByMeasure[answer] += 0.5 * responses[i]
            }
        }

        securityByMeasure[answer] /= totalAnswers
        securityByMeasure[answer] = securityByMeasure[answer].toFixed(3) * 100
    }

    accountSecurityByMeasurePercentage.labels = passwordRelatedQuestions
    accountSecurityByMeasurePercentage.datasets = [{
        label: "Seguridad de contraseñas por medida",
        data: Object.values(securityByMeasure),
    }]

    const bgColors = []
    //const barColors= ['rgb(255,0,0)','rgb(255,255,0)','rgb(255,0,255)','rgb(0,255,0)','rgb(0,255,255)']
    for (var i = 0; i < accountSecurityByMeasurePercentage.datasets[0].data.length; i++) {
        //bgColors.push(getColorForPercentage(accountSecurityByMeasurePercentage.datasets[0].data[i] / 100))
        bgColors.push(getRandomColor())
    }
    // 'rgb(' + [color.r, color.g, color.b].join(',') + ')'
    accountSecurityByMeasurePercentage.labels = ["A", "B", "C", "D"]
    accountSecurityByMeasurePercentage.datasets[0].backgroundColor = bgColors
    console.log(accountSecurityByMeasurePercentage)
}

function fillParticipantsByAge() {
    const AgeBar = {
        "Menos de 13": {
            people: 0,
            totalResponses: 0
        },
        "13 a 17": {
            people: 0,
            totalResponses: 0
        },
        "18 a 29": {
            people: 0,
            totalResponses: 0
        },
        "30 a 50": {
            people: 0,
            totalResponses: 0
        },
        "Mayor de 50": {
            people: 0,
            totalResponses: 0
        }
    }
    for (const response of responseDataNotFormatted) {
        const ages = response["Edad"]
        if (ages == "Menos de 13") {
            AgeBar['Menos de 13'].people += 1
            AgeBar['Menos de 13'].totalResponses += 1
        } else {
            if (ages == "13 a 17") {
                AgeBar['13 a 17'].people += 1
                AgeBar['13 a 17'].totalResponses += 1
            } else {
                if (ages == "18 a 29") {
                    AgeBar['18 a 29'].people += 1
                    AgeBar['18 a 29'].totalResponses += 1
                } else {
                    if (ages == "30 a 50") {
                        AgeBar['30 a 50'].people += 1
                        AgeBar['30 a 50'].totalResponses += 1
                    } else {
                        AgeBar['Mayor de 50'].people += 1
                        AgeBar['Mayor de 50'].totalResponses += 1
                    }
                }

            }
        }



    }
    console.log(AgeBar)
    participantsByAge.labels = Object.keys(AgeBar)
    participantsByAge.datasets = [{
        label: "Seguridad de cuentas por grupo etario",
        data: Object.values(AgeBar).map((d) => d.people),
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
    }]
    const bgColors = []
    //const barColors= ['rgb(255,0,0)','rgb(255,255,0)','rgb(255,0,255)','rgb(0,255,0)','rgb(0,255,255)']
    for (var i = 0; i < participantsByAge.datasets[0].data.length; i++) {
        //bgColors.push(getColorForPercentage(accountSecurityByMeasurePercentage.datasets[0].data[i] / 100))
        bgColors.push(getRandomColor())
    }
    participantsByAge.datasets[0].backgroundColor = bgColors
}

function fillAccountSecurityByAge() {
    const passwordRelatedQuestions = ["¿Actualizás tus contraseñas regularmente?", "¿Tenés contraseñas variadas?", "¿Sabés lo que es la autenticación de dos factores?", "¿Ignorás mails sospechosos?"]
    const ageAndSecurity = {
        "Menos de 13": {
            security: 0,
            totalResponses: 0
        },
        "13 a 17": {
            security: 0,
            totalResponses: 0
        },
        "18 a 29": {
            security: 0,
            totalResponses: 0
        },
        "30 a 50": {
            security: 0,
            totalResponses: 0
        },
        "Mayor de 50": {
            security: 0,
            totalResponses: 0
        }
    }

    for (let response of responseDataNotFormatted) {
        const ageRange = response["Edad"]

        for (let question of passwordRelatedQuestions) {
            if (response[question] === "Sí" || response[question] === "Si") {
                ageAndSecurity[ageRange].security += 1

            } else if (response[question] === "A veces") {
                ageAndSecurity[ageRange].security += 0.5
            }

            ageAndSecurity[ageRange].totalResponses += 1
        }
    }

    for (let data of (Object.values(ageAndSecurity))) {
        data.security /= data.totalResponses
        data.security = data.security.toFixed(3) * 100
    }

    accountSecurityByAgeData.labels = Object.keys(ageAndSecurity)
    accountSecurityByAgeData.datasets = [{
        label: "Seguridad de cuentas por grupo etario",
        data: Object.values(ageAndSecurity).map((d) => d.security),
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
    }]

    const bgColors = []
    for (var i = 0; i < accountSecurityByAgeData.datasets[0].data.length; i++) {
        //bgColors.push(getColorForPercentage(accountSecurityByAgeData.datasets[0].data[i] / 100))
        bgColors.push(getRandomColor())
    }
    accountSecurityByAgeData.labels = ["A", "B", "C", "D", "E"]
    accountSecurityByAgeData.datasets[0].backgroundColor = bgColors
}


function fillOtherSecurityByMeasurePercentage() {
    const passwordRelatedQuestions = ["¿Usás Antivirus?", "¿Corroborás que la barra de navegación tenga el candado?", "¿Usás Wi-Fi público?"]
    const securityByMeasure = {}

    for (let answer of passwordRelatedQuestions) {
        const labels = chartData[answer].labels
        const responses = chartData[answer].datasets[0].data
        const totalAnswers = responses.reduce((x, y) => x + y)
        securityByMeasure[answer] = 0

        for (var i = 0; i < 3; i++) {
            if (answer !== "¿Usás Wi-Fi público?") {
                if (labels[i] === "Sí" || labels[i] === "Si") {
                    securityByMeasure[answer] += 1 * responses[i]
                } else if (labels[i] === "A veces") {
                    securityByMeasure[answer] += 0.5 * responses[i]
                }
            } else {
                if (labels[i] === "No") {
                    securityByMeasure[answer] += 1 * responses[i]
                }
            }

        }

        securityByMeasure[answer] /= totalAnswers
        securityByMeasure[answer] = securityByMeasure[answer].toFixed(3) * 100
    }

    otherSecurityByMeasurePercentage.labels = passwordRelatedQuestions
    otherSecurityByMeasurePercentage.datasets = [{
        label: "Seguridad de contraseñas por medida",
        data: Object.values(securityByMeasure),
    }]

    const bgColors = []
    for (var i = 0; i < otherSecurityByMeasurePercentage.datasets[0].data.length; i++) {
        //bgColors.push(getColorForPercentage(otherSecurityByMeasurePercentage.datasets[0].data[i] / 100))
        bgColors.push(getRandomColor())
    }

    otherSecurityByMeasurePercentage.labels[2] = "¿Usás Wi-Fi público? (positivo si no lo usan)"
    otherSecurityByMeasurePercentage.labels = ["A", "B", "C"]
    otherSecurityByMeasurePercentage.datasets[0].backgroundColor = bgColors
    console.log(otherSecurityByMeasurePercentage)
}


function fillOtherSecurityByAge() {
    const otherSecRelatedQuestions = ["¿Usás Antivirus?", "¿Corroborás que la barra de navegación tenga el candado?", "¿Usás Wi-Fi público?"]
    const ageAndSecurity = {
        "Menos de 13": {
            security: 0,
            totalResponses: 0
        },
        "13 a 17": {
            security: 0,
            totalResponses: 0
        },
        "18 a 29": {
            security: 0,
            totalResponses: 0
        },
        "30 a 50": {
            security: 0,
            totalResponses: 0
        },
        "Mayor de 50": {
            security: 0,
            totalResponses: 0
        }
    }

    for (let response of responseDataNotFormatted) {
        const ageRange = response["Edad"]

        for (let question of otherSecRelatedQuestions) {
            if (question !== "¿Usás Wi-Fi público?") {
                if (response[question] === "Sí" || response[question] === "Si") {
                    ageAndSecurity[ageRange].security += 1

                } else if (response[question] === "A veces") {
                    ageAndSecurity[ageRange].security += 0.5
                }
            } else {
                if (response[question] === "No") {
                    ageAndSecurity[ageRange].security += 1
                }
            }

            ageAndSecurity[ageRange].totalResponses += 1
        }
    }


    for (let data of (Object.values(ageAndSecurity))) {
        data.security /= data.totalResponses
        data.security = data.security.toFixed(3) * 100
    }

    otherSecurityByAgeData.labels = Object.keys(ageAndSecurity)
    otherSecurityByAgeData.datasets = [{
        label: "Porcentaje de otras prácticas de seguridad seguidas por grupo etario",
        data: Object.values(ageAndSecurity).map((d) => d.security),
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
    }]

    const bgColors = []
    for (var i = 0; i < otherSecurityByAgeData.datasets[0].data.length; i++) {
        //bgColors.push(getColorForPercentage(otherSecurityByAgeData.datasets[0].data[i] / 100))
        bgColors.push(getRandomColor())
    }
    otherSecurityByAgeData.labels = ["A", "B", "C", "D", "E"]
    otherSecurityByAgeData.datasets[0].backgroundColor = bgColors
}


function fillGeneralSecurityByMeasurePercentage() {
    const passwordRelatedQuestions = ["¿Actualizás tus contraseñas regularmente?", "¿Tenés contraseñas variadas?", "¿Sabés lo que es la autenticación de dos factores?", "¿Ignorás mails sospechosos?", "¿Usás Antivirus?", "¿Corroborás que la barra de navegación tenga el candado?", "¿Usás Wi-Fi público?"]
    const securityByMeasure = {}

    for (let answer of passwordRelatedQuestions) {
        const labels = chartData[answer].labels
        const responses = chartData[answer].datasets[0].data
        const totalAnswers = responses.reduce((x, y) => x + y)
        securityByMeasure[answer] = 0

        for (var i = 0; i < 3; i++) {
            if (answer !== "¿Usás Wi-Fi público?") {
                if (labels[i] === "Sí" || labels[i] === "Si") {
                    securityByMeasure[answer] += 1 * responses[i]
                } else if (labels[i] === "A veces") {
                    securityByMeasure[answer] += 0.5 * responses[i]
                }
            } else {
                if (labels[i] === "No") {
                    securityByMeasure[answer] += 1 * responses[i]
                }
            }

        }

        securityByMeasure[answer] /= totalAnswers
        securityByMeasure[answer] = securityByMeasure[answer].toFixed(3) * 100
    }

    generalSecurityByMeasurePercentage.labels = passwordRelatedQuestions
    generalSecurityByMeasurePercentage.datasets = [{
        data: Object.values(securityByMeasure),
    }]

    const bgColors = []
    for (var i = 0; i < generalSecurityByMeasurePercentage.datasets[0].data.length; i++) {
        //bgColors.push(getColorForPercentage(generalSecurityByMeasurePercentage.datasets[0].data[i] / 100))
        bgColors.push(getRandomColor())
    }

    generalSecurityByMeasurePercentage.labels[2] = "¿Usás Wi-Fi público? (positivo si no lo usan)"

    generalSecurityByMeasurePercentage.datasets[0].backgroundColor = bgColors
    console.log(generalSecurityByMeasurePercentage)
}


function fillGeneralSecurityByAge() {
    const otherSecRelatedQuestions = ["¿Actualizás tus contraseñas regularmente?", "¿Tenés contraseñas variadas?", "¿Sabés lo que es la autenticación de dos factores?", "¿Ignorás mails sospechosos?", "¿Usás Antivirus?", "¿Corroborás que la barra de navegación tenga el candado?", "¿Usás Wi-Fi público?"]
    const ageAndSecurity = {
        "Menos de 13": {
            security: 0,
            totalResponses: 0
        },
        "13 a 17": {
            security: 0,
            totalResponses: 0
        },
        "18 a 29": {
            security: 0,
            totalResponses: 0
        },
        "30 a 50": {
            security: 0,
            totalResponses: 0
        },
        "Mayor de 50": {
            security: 0,
            totalResponses: 0
        }
    }

    for (let response of responseDataNotFormatted) {
        const ageRange = response["Edad"]

        for (let question of otherSecRelatedQuestions) {
            if (question !== "¿Usás Wi-Fi público?") {
                if (response[question] === "Sí" || response[question] === "Si") {
                    ageAndSecurity[ageRange].security += 1

                } else if (response[question] === "A veces") {
                    ageAndSecurity[ageRange].security += 0.5
                }
            } else {
                if (response[question] === "No") {
                    ageAndSecurity[ageRange].security += 1
                }
            }

            ageAndSecurity[ageRange].totalResponses += 1
        }
    }


    for (let data of (Object.values(ageAndSecurity))) {
        data.security /= data.totalResponses
        data.security = data.security.toFixed(3) * 100
    }

    generalSecurityByAgeData.labels = Object.keys(ageAndSecurity)
    generalSecurityByAgeData.datasets = [{
        data: Object.values(ageAndSecurity).map((d) => d.security),
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
    }]

    const bgColors = []
    for (var i = 0; i < generalSecurityByAgeData.datasets[0].data.length; i++) {
        //bgColors.push(getColorForPercentage(generalSecurityByAgeData.datasets[0].data[i] / 100))
        bgColors.push(getRandomColor())
    }

    generalSecurityByAgeData.labels = ["A", "B", "C", "D", "E"]
    generalSecurityByAgeData.datasets[0].backgroundColor = bgColors
}

function fillUnuauthorizedAccountAccess() {
    for (let response of responseDataNotFormatted) {
        if (response["¿Accedieron a tu cuenta sin tu permiso alguna vez?"] === "Sí" || response["¿Accedieron a tu cuenta sin tu permiso alguna vez?"] === "Si") {
            unuauthorizedAccountAccesses[0] += 1
        } else if (response["¿Accedieron a tu cuenta sin tu permiso alguna vez?"] === "No") {
            unuauthorizedAccountAccesses[1] += 1
        }

    }

    unuauthorizedAccountAccessData.labels = ["Accedieron a su cuenta ilegalmente (58%)", "Nunca accedieron a su cuenta ilegalmente (42%)"]
    unuauthorizedAccountAccessData.datasets = [{
        data: unuauthorizedAccountAccesses,
        backgroundColor: ["rgb(255,0,0)", "rgb(0,255,0)"]
    }]
}

function animateChart(index) {
    console.log(index)
    graphAnimations[index] = true
    const prox = toRaw(graphRefs.value)[index]
}



reformatData()
cleanAndGroupData()
fillAccountSecurityByMeasurePercentage()
fillOtherSecurityByMeasurePercentage()
fillGeneralSecurityByMeasurePercentage()
fillAccountSecurityByAge()
fillOtherSecurityByAge()
fillGeneralSecurityByAge()
fillUnuauthorizedAccountAccess()
fillParticipantsByAge()
onMounted(() => {
    /*     var ctx = document.getElementById("pie-chart").getContext('2d');
        var myChart = new ChartJS(ctx, {
            type: 'pie',
            data: {
                datasets: data
            },
            options: options
        }); */
    console.log("accountSecurityByAgeData", accountSecurityByAgeData)
    console.log("accountSecurityByMeasurePercentage", accountSecurityByMeasurePercentage)
    console.log("otherSecurityByMeasurePercentage", otherSecurityByMeasurePercentage)
    console.log("otherSecurityByAgeData", otherSecurityByAgeData)
    console.log("generalSecurityByMeasurePercentage", generalSecurityByMeasurePercentage)
    console.log("generalSecurityByAgeData", generalSecurityByAgeData)

    /*    const graphs = Array.from(document.querySelectorAll(".graph"))
       graphs.forEach((graph, index) => {
           const observer = new IntersectionObserver(([entry]) => {
               if (entry.isIntersecting) {
                   animateChart(index)
                   console.log("ANIMATAE")
                   observer.disconnect()
               }
           }, { threshold: [0] })
   
           observer.observe(graph, index)
       })
   
   
       console.log(toRaw(graphRefs.value)) */
}) 
</script>

<style>
body {
    margin: 0;

    padding: 0;

    background-color: #111927;
}

* {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0px;
}

h1,
h2,
h3,
p,
li,
b {
    color: rgb(233, 230, 230);

    padding: 0px 10px;
}

header {
    background-color: black;
    border-bottom-left-radius: 80px;
    border-bottom-right-radius: 80px;
    border-bottom: 5px solid rgb(233, 230, 230);
    border-left: 5px solid rgb(233, 230, 230);
    border-right: 5px solid rgb(233, 230, 230);
}

h1,
h2,
h3 {
    background-color: transparent !important;
    text-align: center;
}

h1 {
    padding: 5px 10px;
    color: #9fef00;
    text-align: center;
    font-size: 2rem;
}

h2 {
    color: #9fef00;
    font-size: 1.6rem;
}

h3 {
    font-size: 1.3rem;
}

header,
.graphContainer {
    display: flex;

    justify-content: center;
}

.barGraph {
    margin-top: 20px !important;
    min-height: 250px !important;
    height: 30vw;
    max-height: 600px !important;

    max-width: 800px !important;
}

.barGraph * {
    color: rgb(233, 230, 230) !important;
}

.card {
    margin: 20px 10%;

    padding: 10px;

    background-color: black;

    border: 5px solid rgb(233, 230, 230);

    border-radius: 5px;
}

.centered {
    text-align: center;
}

main {
    padding: 10px 25px;
    margin-top: 50px;
}

.title {
    margin-top: 70px;
}</style>
