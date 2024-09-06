<script>
  export let correct_answer = "not yet set";
  export let guessing;
  export let correct;
  export let randomiser;

  const good_emojis = [
    "ദ്ദി ˶ˆᗜˆ˵)",
    "ദ്ദി(ᵔᗜᵔ)",
    "( ദ്ദി ˙ᗜ˙ )",
    "⸜(｡˃ ᵕ < )⸝♡",
    "ᕙ(  •̀ ᗜ •́  )ᕗ",
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
    "pretty bad ngl",
    "bad bad bad all round BAD",
    "sorry dude",
    "maybe next time",
    "god that was not it",
    "eerghh",
    "sorry but no",
    "try again..",
    "..........",
    "that was NOT IT urgh",
  ];
</script>

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

<style>
  p {
    margin: 1em auto;
    font-size: 2em;
  }
</style>
