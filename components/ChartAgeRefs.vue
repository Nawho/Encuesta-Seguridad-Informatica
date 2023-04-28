<template>
    <p>
        <b>Referencia:</b>
        <br>
        <span v-for="data in Object.entries(ageMap)">
            {{ data[0] }} - {{ data[1] }}
            <br>
        </span>
    </p>
</template>

<script setup>
const ageMap = {
    "A": "Menos de 13",
    "B": "13 a 17",
    "C": "18 a 29",
    "D": "30 a 50",
    "E": "Mayor de 50",
}

</script>