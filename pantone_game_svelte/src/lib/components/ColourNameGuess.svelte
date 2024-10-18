<script>
  import { onMount } from "svelte";

  export let correct_answer = "loading";
  export let guessing;
  export let correct;
  export let randomiser;
  export let max_score;
  export let score;
  export let setGame;

  const frames = ["ദ്ദി ˶ˆᗜˆ˵)", "ദ്ദി(ᵔᗜᵔ)"];
  $: frame_cycler = 0;

  onMount(() => {
    const interval = setInterval(() => {
      if (max_score === score) {
        if (frame_cycler > 0) {
          frame_cycler -= 1;
          setGame();
        } else {
          frame_cycler += 1;
        }
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const good_emojis = [
    "ദ്ദി ˆᗜˆ)",
    "ദ്ദി(^ᗜ^)",
    "(ദി ˙ᗜ˙)",
    "⸜(｡> u < )⸝♡",
    "ᕙ( •̀ ᗜ •́ )ᕗ",
    "\(^ᗜ^)/",
    "⸜(｡^ u ^)⸝",
    "(=ˆᗜˆ=)",
    "໒(=•̀  u •́)",
    "( >u< )",
  ];

  const good_messages = [
    "hell yeah dude!!!",
    "nailed it!",
    "yessss!!!!",
    "you got it!",
    "incredible work",
    "amazing!",
    "you psychic or something?",
    "good good GREAT!",
    "in awe",
    "yes keep it up!!",
    "wonderful!",
    "excellent skills",
    "so proud of you",
  ];

  const bad_emojis = [
    "(·•ࡇ• )",
    "(｡•́︿•̀｡)",
    "┐(´～｀ˇ)┌",
    "( ˙◠˙ )",
    "(っ- _ - ς)",
    "(⊙ _ ⊙ )",
    "ᕙ( ᗒᗣᗕ )ᕗ",
    "｡°(°.◜ᯅ◝°)°｡",
    "(´•︵•`)",
    "૮(• ࡇ •)ა",
    "(ó﹏ò｡)",
    "(つ╥﹏╥)つ",
  ];

  const bad_messages = [
    "you beefed it",
    "not good",
    "questionable choice",
    "pretty bad",
    "bad bad all round BAD",
    "sorry dude",
    "maybe next time",
    "that was not it",
    "eerghh",
    "sorry but no",
    "try again..",
    "..........",
    "that was NOT IT",
  ];

  function cycleFrames(frames) {
    if (frame_cycler > 0) {
      frame_cycler = -1;
    } else {
      frame_cycler = +1;
    }
    setTimeout(1000);
  }
</script>

{#if score < max_score}
  {#if !guessing && correct}
    <p class="guess-result-message">
      {randomiser(good_emojis)}
      {randomiser(good_messages)}
    </p>
  {:else if !guessing && !correct}
    <p class="guess-result-message">
      {randomiser(bad_emojis)}
      {randomiser(bad_messages)}
    </p>
  {:else}
    <p class="colour-main-text">{correct_answer.replaceAll("-", " ")}</p>
  {/if}
{:else}
  <div class="congrats-message-wrapper">
    <p class="congrats-message-anim" on={cycleFrames()}>
      {frames[frame_cycler]}
    </p>
    <p class="congrats-message-text">Congrats!!!</p>
  </div>
{/if}

<div class="emoji-check">
  {#each { length: bad_emojis.length } as _, i}
  <p> {bad_emojis[i]} </p>
  {/each}
</div>

<div class="emoji-check">
  {#each { length: good_emojis.length } as _, i}
  <p> {good_emojis[i]} </p>
  {/each}
</div>

<style>
  @media (min-width: 320px) and (max-width: 999px) {
    .congrats-message-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    p {
      margin: auto;
      font-size: 1.5em;
    }

    .congrats-message-text {
      font-size: 0.75em;
    }

    .guess-result-message {
      font-size: 1em;
      padding-top: 6px;
      padding-bottom: 6px;
    }

    .colour-main-text {
      font-size: 20px;
      margin-top: 0px;
    }

    .emoji-check {
      margin-right: 20px;
    }
  }

  @media (min-width: 1000px) {
    p {
      margin: 1em auto;
      font-size: 2em;
    }

    .congrats-message-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-top: 15px;
    }

    .congrats-message-anim,
    .congrats-message-text {
      margin: auto;
    }
  }
</style>
