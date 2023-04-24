<template>
    <h1 class="title">Información sobre la encuesta de seguridad informática</h1>

    <div class="card">
        <h3>Descripición</h3>

        <p>
            En este encuesta recolectamos datos acerca de qué tan seguras son las
            prácticas de seguridad online de los encuestados (actualizar sus
            contraseñas regularmente, usar Wi-Fi público, antivirus, etc). Por un lado
            analizaremos los resultados generales, y por otro los resultados según
            grupos etarios.
        </p>
    </div>

    <div class="card">
        <h3>Objetivos</h3>

        <p>
            Con estos datos queremos darnos una idea de qué tanta educación y
            concientización hace falta respecto a buenasn prácticas de seguridad, para
            poder informar a la gente respecto de lo que más ignorancia haya y para
            ayudarlos a prevenir malware, estafas y diversos ataques informáticos.
        </p>
    </div>

    <div class="card">
        <h3>Datos adicionales</h3>
        <ul>
            <li><b>Equipo de investigación:</b> Grupo ISECA.</li>

            <li><b>Muestra:</b> Grupo de encuestados aleatorios de Argentina.</li>

            <li><b>Fecha de publicación de la encuesta:</b> 17/04/2023.</li>

            <li><b>Fecha de finalización de la encuesta:</b> 23/04/2023.</li>
        </ul>
    </div>

    <h1 class="title">Resultados de la encuesta de seguridad informática</h1>


    <main>
        <h2>Seguridad de cuentas personales</h2>
        <h3>
            Porcentaje de buenas prácticas de seguridad de cuentas personales que sigue la gente
            (por edad):
        </h3>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="accountSecurityByAgeData"
                :options="{ ...barOptions, animation: graphAnimations[0] }" :ref="el => { if (el) graphRefs[0] = el }" />
        </div>

        <br><br><br><br><br>

        <h3>
            Porcentaje de buenas prácticas de seguridad de cuentas personales que sigue la gente (por práctica):
        </h3>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="accountSecurityByMeasurePercentage"
                :options="{ ...barOptions, animation: graphAnimations[1] }" :ref="el => { if (el) graphRefs[1] = el }" />
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

        <br><br><br><br><br>

        <h3>
            Porcentaje de otras prácticas de seguridad que emplea la gente (por práctica):
        </h3>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="otherSecurityByMeasurePercentage"
                :options="{ ...barOptions, animation: graphAnimations[3] }" :ref="el => { if (el) graphRefs[3] = el }" />
        </div>


        <br><br><br><br><br><br><br>



        <h2>Porcentaje de cómo cree la gente que roban las cuentas</h2>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="chartData['¿Tenés contraseñas variadas?']"
                :options="{ ...barOptions, animation: graphAnimations[4] }" />
        </div>

        <br><br><br><br><br><br><br>

        <h2>Porcentaje de personas a cuyas cuenta accedieron sin permiso:</h2>
        <div class="graphContainer">
            <Pie class="graph" :data="unuauthorizedAccountAccessData"
                :options="{ ...pieOptions, animation: graphAnimations[5] }" />
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

        <br><br><br><br><br>

        <h3>
            Porcentaje de buenas prácticas seguidas en total (por práctica):
        </h3>
        <div class="graphContainer">
            <Bar class="graph barGraph" :data="generalSecurityByMeasurePercentage"
                :options="{ ...barOptions, animation: graphAnimations[7] }" />
        </div>
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


const percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }];

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
        "¿Qué redes sociales usás frecuentemente?": "WhatsApp, Instagram, Tik tok",
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
        "¿Qué redes sociales usás frecuentemente?": "tik tok",
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
    }
]

const graphAnimations = ref([false, false, false, false, false, false, false])
const responseData = {}
const chartData = {}
const accountSecurityByAgeData = {}
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

        for (var i = 0; i < 3; i++) {
            if (labels[i] === "Sí" || labels[i] === "Si") {
                securityByMeasure[answer] += 1 * responses[i]
            } else if (labels[i] === "A veces") {
                securityByMeasure[answer] += 0.5 * responses[i]
            }
        }

        securityByMeasure[answer] /= totalAnswers
        securityByMeasure[answer] = securityByMeasure[answer].toFixed(4) * 100
    }

    accountSecurityByMeasurePercentage.labels = passwordRelatedQuestions
    accountSecurityByMeasurePercentage.datasets = [{
        label: "Seguridad de contraseñas por medida",
        data: Object.values(securityByMeasure),
    }]

    const bgColors = []
    for (var i = 0; i < accountSecurityByMeasurePercentage.datasets[0].data.length; i++) {
        bgColors.push(getColorForPercentage(accountSecurityByMeasurePercentage.datasets[0].data[i] / 100))
    }

    accountSecurityByMeasurePercentage.datasets[0].backgroundColor = bgColors
    console.log(accountSecurityByMeasurePercentage)
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
        data.security = data.security.toFixed(4) * 100
    }

    accountSecurityByAgeData.labels = Object.keys(ageAndSecurity)
    accountSecurityByAgeData.datasets = [{
        label: "Seguridad de cuentas por grupo etario",
        data: Object.values(ageAndSecurity).map((d) => d.security),
    }]

    const bgColors = []
    for (var i = 0; i < accountSecurityByAgeData.datasets[0].data.length; i++) {
        bgColors.push(getColorForPercentage(accountSecurityByAgeData.datasets[0].data[i] / 100))
    }

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
        securityByMeasure[answer] = securityByMeasure[answer].toFixed(4) * 100
    }

    otherSecurityByMeasurePercentage.labels = passwordRelatedQuestions
    otherSecurityByMeasurePercentage.datasets = [{
        label: "Seguridad de contraseñas por medida",
        data: Object.values(securityByMeasure),
    }]

    const bgColors = []
    for (var i = 0; i < otherSecurityByMeasurePercentage.datasets[0].data.length; i++) {
        bgColors.push(getColorForPercentage(otherSecurityByMeasurePercentage.datasets[0].data[i] / 100))
    }

    otherSecurityByMeasurePercentage.labels[2] = "¿Usás Wi-Fi público? (positivo si no lo usan)"

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
        data.security = data.security.toFixed(4) * 100
    }

    otherSecurityByAgeData.labels = Object.keys(ageAndSecurity)
    otherSecurityByAgeData.datasets = [{
        label: "Porcentaje de otras prácticas de seguridad seguidas por grupo etario",
        data: Object.values(ageAndSecurity).map((d) => d.security),
    }]

    const bgColors = []
    for (var i = 0; i < otherSecurityByAgeData.datasets[0].data.length; i++) {
        bgColors.push(getColorForPercentage(otherSecurityByAgeData.datasets[0].data[i] / 100))
    }

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
        securityByMeasure[answer] = securityByMeasure[answer].toFixed(4) * 100
    }

    generalSecurityByMeasurePercentage.labels = passwordRelatedQuestions
    generalSecurityByMeasurePercentage.datasets = [{
        data: Object.values(securityByMeasure),
    }]

    const bgColors = []
    for (var i = 0; i < generalSecurityByMeasurePercentage.datasets[0].data.length; i++) {
        bgColors.push(getColorForPercentage(generalSecurityByMeasurePercentage.datasets[0].data[i] / 100))
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
        data.security = data.security.toFixed(4) * 100
    }

    generalSecurityByAgeData.labels = Object.keys(ageAndSecurity)
    generalSecurityByAgeData.datasets = [{
        data: Object.values(ageAndSecurity).map((d) => d.security),
    }]

    const bgColors = []
    for (var i = 0; i < generalSecurityByAgeData.datasets[0].data.length; i++) {
        bgColors.push(getColorForPercentage(generalSecurityByAgeData.datasets[0].data[i] / 100))
    }

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

    unuauthorizedAccountAccessData.labels = ["Alguna vez accedieron a su cuenta sin permiso", "Nunca accedieron a su cuenta sin permiso"]
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

/* onMounted(() => {
    const graphs = Array.from(document.querySelectorAll(".graph"))
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


    console.log(toRaw(graphRefs.value))
}) */
</script>

<style>
body {
    margin: 0;

    padding: 0;

    background-color: #111927;
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
li {
    color: rgb(233, 230, 230);

    padding: 0px 10px;
}

header {
    background-color: black;
    border-bottom-left-radius: 80px;
    border-bottom-right-radius: 80px;
    border-bottom: 5px solid white;
    border-left: 5px solid white;
    border-right: 5px solid white;
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
}

h2 {
    color: #9fef00;
    font-size: 2rem;
}

h3 {
    font-size: 1.5rem;
}

header,
.graphContainer {
    display: flex;

    justify-content: center;
}

.barGraph {
    margin-top: 20px !important;
    height: 30vw;
    max-height: 600px !important;

    max-width: 800px !important;
}

.barGraph * {
    color: white !important;
}

.card {
    margin: 20px 10%;

    padding: 10px;

    background-color: black;

    border: 5px solid #9fef00;

    border-radius: 5px;
}

main {
    padding: 0px 60px;
}
</style>
