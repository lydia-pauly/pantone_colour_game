<script>
  import { onMount } from "svelte";

  export let correct_answer = "not yet set";
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
          console.log(frame_cycler);
        } else {
          frame_cycler += 1;
          console.log(frame_cycler);
        }
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const good_emojis = [
    "ദ്ദി ˶ˆᗜˆ˵)",
    "ദ്ദി(ᵔᗜᵔ)",
    "( ദ്ദി ˙ᗜ˙ )",
    "⸜(｡˃ ᵕ < )⸝♡",
    "ᕙ(  •̀ ᗜ •́  )ᕗ",
    "◝(ᵔᗜᵔ)◜",
    "⸜(｡^ ᵕ ^ )⸝",
    "(˶ˆᗜˆ˵)",
    "໒( ˵ •̀  ᴗ •́˵)",
    "( >ᴗ< )",
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
    "(·•᷄ࡇ•᷅ )",
    "(｡•́︿•̀｡)",
    "┐(´～｀ˇ)┌",
    "( ˙◠˙ )",
    "(っ- ‸ - ς)",
    "(⊙ _ ⊙ )",
    "ᕙ( ᗒᗣᗕ )ᕗ",
    "｡°(°.◜ᯅ◝°)°｡",
    "(´•︵•`)",
    "૮₍•᷄ ࡇ •᷅₎ა",
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
    <p>
      {randomiser(good_emojis)}
      {randomiser(good_messages)}
    </p>
  {:else if !guessing && !correct}
    <p>
      {randomiser(bad_emojis)}
      {randomiser(bad_messages)}
    </p>
  {:else}
    <p class="colour main-text">{correct_answer.replaceAll("-", " ")}</p>
  {/if}
{:else}
  <div class="congrats-message-wrapper">
    <p class="congrats-message-anim" on={cycleFrames()}>
      {frames[frame_cycler]}
    </p>
    <p class="congrats-message-text">Congrats!!!</p>
  </div>
{/if}

<style>
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
</style>
