<template>
  <section class="section-info">
    <div class="container container--small color-gray-dark">
      <h2 class="title--h2">Sobre</h2>
      <p class="text--body">
        Olá, Sou um dos criadores do
        <span class="color-green-dark">#SigaCorona</span> e vim escrever um pouco da motivação que tivemos ao
        desenvolver este Site e apresentar o grupo que participou deste projeto.
      </p>

      <p class="text--body">
        Uma contextualização necessária para futuros os visitantes, enquanto estou escrevendo este texto, o Mundo está
        em quarentena por conta da pandemia causada pelo
        <strong class="color-green-dark">CoronaVírus</strong>.
      </p>

      <p class="text--body">
        Esse momento que estamos vivendo será discutido e estudado por muitos anos, porém além de enfrentarmos esta
        crise temos que lidar com mais um problema que são as fake news.
      </p>

      <p class="text--body">
        Não vou nem citar o desserviço que o atual presidente está fazendo, pois não somos especialistas para debater
        sobre o assunto e sim Desenvolvedores.
      </p>

      <p class="text--body">E por isso nos juntamos para fazer o que sabemos de melhor.</p>

      <p class="text--body">
        O portal
        <span class="color-green-dark">#SigaCorona</span> é um agregador de notícias que são buscadas automaticamente
        por um robô e disponibilizadas por uma api para o nosso front consumir. Todo o código é livre e está disponível
        no <a target="_blank" class="color-green-dark" href="https://github.com/bgabraga2/siga-corona">github</a>.
      </p>

      <ul class="mt-5">
        <li class="text--body">
          <a href="https://twitter.com/bgabraga" target="_blank" rel="noopener noreferrer">
            <span class="color-green-dark">@bgabraga</span> </a
          >: Idealizador e Dev do robô
        </li>
        <li class="text--body">
          <a href="https://twitter.com/synthnardo" target="_blank" rel="noopener noreferrer">
            <span class="color-green-dark">@synthnardo</span> </a
          >: Designer
        </li>
        <li class="text--body">
          <a href="https://twitter.com/mateusbarros92" target="_blank" rel="noopener noreferrer">
            <span class="color-green-dark">@mateusbarros92</span> </a
          >: Dev Back
        </li>
        <li class="text--body">
          <a href="https://twitter.com/vilasboasdev" target="_blank" rel="noopener noreferrer">
            <span class="color-green-dark">@vilasboasdev</span> </a
          >: Dev Front
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class SectionInfo extends Vue {}
</script>

<style lang="scss" scoped>
.section-info {
  text-align: left;

  .container--small {
    max-width: 630px;
  }
  h2 {
    text-align: center;
    margin-bottom: 40px;
    color: #38b270;
  }

  p {
    margin-bottom: 20px;
    line-height: 23px;
  }

  li {
    margin-bottom: 15px;
  }

  a {
    text-decoration: underline;
  }

  .color-green-dark {
    color: #38b270;
  }
}
</style>
