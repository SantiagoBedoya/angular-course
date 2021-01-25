/*
    ===== Código de TypeScript =====
*/
let habilidades: string[] = ['Bash', 'Counter', 'Healing'];

interface Personaje {
    nombre: string;
    hp: number;
    habilidades: string[],
    publoNatal?: string;
}

const personaje: Personaje = {
    nombre: 'strider',
    hp: 100,
    habilidades: ['Bash', 'Counter', 'Healing']
}
personaje.publoNatal = 'Manizales';

console.table(personaje);