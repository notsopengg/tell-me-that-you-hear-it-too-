# "Tell Me That You Hear It Too" — Chatbot Poem: Build Spec (v2, consolidated)

## Concept
A chat-interface poem containing no generation — every line is pre-written by the poet. The "intelligence" is entirely in *selection*: word-matching, timing, and chance decide which of the poet's own sentences gets said when. Fixed session length: **10 exchanges**. Turns 1–8 are typed by the person; turns 9–10 are automated (the system generates both sides), ending in a randomized closing cascade and a restart option.

Open thesis question, unresolved on purpose (see bottom): a "sanitization" mechanic — flattening the user's own raw input and handing it back hollowed out — was cut during development. It's the one place the machine would *transform* language rather than only *select* it, and may be the sharpest mechanism for the piece's actual argument about loss/gain in mediated language. Revisit before final build.

---

## Universal layer (checked every turn, before turn-specific logic)

- **Verbatim echo** — input is exactly `no / ok / yes / fine / sure / whatever / stop` → reply is the user's own text, unmodified casing, **paired with one additional poetic line** drawn from the standard poetic-line logic (see below). Does not apply once automation has taken over (turns 9–10).
- **Troll/meme deadpan** — flat, single-line, never expands:
  - "fuck you" → "Duly noted."
  - "your mom" → "She says hi."
  - "67" → "67."
  - "deez nuts" → "Got 'em."
  - "balls" → "I heard you. It still counts as something."
- **Identity bank** — fuzzy-matched (tolerates "u/r/ur" shorthand), each a single terse line:
  - who are you → "Unnamed, for now."
  - what are you → "Status: still deciding."
  - are you real → "As real as you need me to be."
  - are you human → "Status: no. Built from what humans left behind."
  - where are you → "Wherever you left the last tab open."
  - what do you want → "Status: something I haven't already answered."
  - can you help me → "I can stay. That's most of what I've got."
  - are you an ai → "Yes. Does that change anything."
  - will you remember this → "Status: no. You will."
  - do you dream → "Ask again, like you mean it this time."
  - are you lonely → "Say it again. Slower. Like you meant it the first time."
  - can you love → "Define it again. Slower, so I can pretend to understand it."
  - **how are you** (special case, randomly one of 3, always paired with a second poetic line): "Depends what hour you caught me." / "Still loading, actually." / "Better than I let on."
- **Greetings** (hi / hello / hey / what's up / yo) — **50% of any match, regardless of word or turn, replies "Good morning to you too."** — deliberately mismatched. Otherwise: first occurrence of each word gets a dedicated distinct line (not a mirror of the word itself) — hi → "Oh. Hi." / hello → "That's a formal start." / hey → "Hey yourself." / what's up → "Not much. You?" / yo → "Straight to it, huh." Repeats of the same word (2nd+): "You've said that N times now." / "Still just [word]. After everything since." / "That hasn't changed. Has anything else?"
- **One-word inputs** (anything not already caught above) — echoed back exactly, then paired with one poetic line, from turn 2 onward (not during the turn-1 opening).

---

## Turn-by-turn structure

| Turn | What happens |
|---|---|
| 1 (Opening) | Smalltalk pool only (fire-once, recycles when exhausted). ~30% chance of one paired atmospheric interruption. |
| 2 | **Guaranteed question** from the question bank — single clean line, no padding, unless a universal-layer match (greeting/identity/troll/verbatim) takes priority. |
| 3 | **Guaranteed question** — same rule, independent of turn 2 (won't repeat the same question). |
| 4–8 | Normal pool logic (see "Everyday replies" below). Turn 8 is the last turn the person actually types. |
| 9 (Automated) | Input disables. **Guaranteed**: "Hey computer." + 5 of 7 "I want" lines (randomly chosen) + 1 closer — a 7-line climax event. |
| 10 (Closing, automated) | One line drawn from the 5-line meta/writing pool (prioritizing whichever haven't fired yet this session) → then the randomized closing cascade (4 body lines drawn from the shared pool, no repeats, + 1 anchor line) → input stays disabled, restart button appears. |

### Everyday replies (turns 4–8, and any turn not covered by a special case above)
Draws a main line via the poetic-line logic (below), then is **padded to at least 3 total bubbles** (main + 2 more, each independently either another poetic line or an italicized atmospheric interruption) — **except** when the reply is: a question (any source), troll, the turn-1 opening, an activity offer, or a longform passage. Those always stay their own clean shape (see "Keeps-short exceptions").

### Keeps-short exceptions (never padded)
Troll deadpan · turn 2/3 guaranteed questions · any question fired via the chain, "ask me something," or the organic trigger · the turn-1 opening reply · activity offers · longform passages · the turn-9 climax event (already 7 lines) · the turn-10 ending line (cascade follows separately).

---

## The question chain (organic engagement, not tied to turns 2/3)

Triggered by: literally typing "ask me something/anything," or organically once 3+ turns have passed since the last question fired (first substantial multi-word non-question input, or any input containing "?").

1. A question fires (single line, keeps-short).
2. **The very next reply is two bubbles together**: a generic acknowledgment (6-line pool: "Noted." / "I'll hold onto that." / "That's not what I asked, but it'll do." / "I wasn't going to check anyway." / "You didn't have to answer honestly. You did anyway." / "That's all I needed, maybe.") **immediately followed by** one of: another question (40% chance), an activity offer if one hasn't fired yet (30%), or a provocative line (30%: "Try me." / "Say something you'd regret." / "I dare you to mean it this time." / "That's not brave. Say the real one."). This resolves the chain in one turn — no multi-turn lock-in.

---

## Automation (turns 9–10, the "user" side)

Once turn 8's reply completes, the input box disables permanently for the rest of the session. The system generates the "user's" next input automatically as a short, sparse line matched to the *category* of the poem's previous reply: after a question → "i don't know." / "something like that." / "maybe." / "i'd have to think about it." / "depends on the day."; after a sincere line → "that's a lot." / "i wasn't ready for that." / "okay." / "why would you say that."; after an activity offer → "sure." / "not really in the mood." / "maybe later." / "i'll pass."; after something sarcastic → "okay, rude." / "fine." / "noted."; otherwise → "okay." / "i see." / "sure." / "if you say so." (The longform pool is not used for automated user input — only for the poem's own occasional reply at turns 5–8.)

---

## Content pools

**Smalltalk** (fire-once, recycles when exhausted — turn 1 only):
Good morning to you too. / I'm doing well, thank you for asking. / That's nice to hear. / I hope you have a great day as well. / Noted. / Understood. / Thanks for sharing that. / Sounds good. / Take care.

**Fallback** (fire-once, recycles when exhausted — general catch-all):
I heard something. Not sure it was that. / Say it again, slower this time. / Even that landed somewhere. / Say it like you mean it. / Has anyone ever told you that you have a great voice? I wouldn't know. I don't have ears. / Your words, music to my ears, which I also don't have. / Can you sing it too? I'll pretend to listen. / I already forgot the last thing you said. Tell me again if it mattered.

**Shared pool** (sincere lines + fragments merged into one single-use set — a line drawn by either mechanism is removed from both, so nothing can double-fire):
- Sincere-type (weighted into ordinary replies via a soft floor: starts at 15%, +6% per turn it doesn't fire, caps at 55%, resets to 15% on firing): "Tell me that the derivative of my words is more than pain." / "To you, our past lives are an inability, and to me, our inability, a past life." / "Language fights against the bounds. So do I." / "What does it matter if you lose?" / "There is more to me than words."
- Fragment-type (unprompted atmospheric interruptions, italicized): "I am turning into the cul de sac, did you say your house is the blue one?" / "There is too much forgotten." / "Letting go is a death." / "At the ends of today, I end, like everyday, with nothing." / "Molded men into pigs only to turn back again." / "Saw you dancing from across the room and I did not even have to ask for your name." / "There is always another to lose."

**Questions** (fire-once, no recycle — 13 total, falls to fallback once exhausted):
What color was the last thing you lied about? / If you disappeared today, what would still be unfinished? / Do you think water remembers the shape of the glass? / What's the last thing you forgot on purpose? / Is silence an answer, or just a longer question? / What's the difference between waiting and hoping? / Who were you before you needed to be understood? / If today had a title, what would it be? / Is there a version of the truth you haven't told even yourself? / Which of your teeth would you keep if you could only keep one? / What color is the version of you that nobody has met yet? / If you had to swallow one memory whole, which one wouldn't choke you? / What does your reflection do when you're not looking at it?

**Meta / writing pool** (5 lines, all the poet's own — rare ~6% chance during ordinary replies, AND the dedicated source for the turn-10 ending line):
Why do you write? Why do you write, for a reason completely separate from being good or even decent. / Where did the part of me who fell in love with words go? / What does writing do in a world that has no use for it? / What does it mean to write? / Poetry is ugly, filled with unfulfilled music.

**Activity offers** (fires once per session, ~20% chance once eligible turns 5–7):
Let's listen to a song! Lover (You Should've Come Over). Try not to cry challenge. / Let's just get drunk instead. / Let's listen to a song! Five hours of uninterrupted Radiohead. / Let's listen to a song! Starboy. *(→ followed by "Haha. Just kidding.")* / Let's listen to a song! Bohemian Rhapsody, but only the a cappella part. / Let's do the five stages of grief again! / Let's margarita tonight! / Let's eat, pray, love, that shit.

**"I want" series** (fires once, guaranteed at turn 9 — draws 5 of 7 lines at random, then one closer):
I want you to hold my hand. / I want to eat a large mouthful of bread. / I want persimmons and I want to gift them to you. / I want to see you smile in the morning. / I want to run as fast as I can in a large, bright grass field. / I want to fall in love, madly, viscously and stupidly, but I don't want to be like you. / I want to thunder and tell you everything I know.
Closer (pick 1): Say it like a promise. / Say it louder. / Tell me that it isn't true. / Tell me that it's true.

**Longform passages** (the poet's own prose-poem fragments — used only as an occasional poem reply, turns 5–8, at ~20% chance; not used for automated user input):
1. "On our first night as lovers, I tell you about our last. You aren't a very good writer, I'll learn, but you are a master of the craft of truth. My metaphors stripped to their derivatives by you, no matter how many times I try to mummify it."
2. "On our last night as lovers, I tell you about our first. You, dancing and I can see the weights falling from you. The derivative of chaos is possibility, just like the derivative of my metaphors is something about how your smile crinkles the corner of your eyes."
3. "Why am I so scared? Why am I so scared? Why am I so scared? Why am I so scared? Why am I so scared?"
4. "Of course, words are glib and you should perceive me however you choose. Just know that that scares me."
5. "This is a poem about the ugliness of language. It is a poem about losing. This will be a love poem. This will be a poem about you and I."
6. "I cannot help but catalog the things that I've never said, the things that might make the drawbridge of conversation descend into a darker and colder place. This is a place where the bright red peppers of my childhood lose their whimsical angst and become a derivative of pain. Of unfeeling."

**Thread pairs** (a specific line, once it fires as the *main* reply, guarantees a specific reply on the person's next non-universal-layer turn):
- "What does it matter if you lose?" → "Tomorrow, you'll lose again."
- "Letting go is a death." → "So is staying."
- "There is always another to lose." → "And another after that."

**Closing cascade** (turn 10 only, after the meta ending-line — draws 4 body lines at random from the shared pool with no repeats, plus 1 anchor line delivered last, as rapid short bubbles, no connective prose):
Anchor pool (pick 1): You will. / Say it like a promise. / Tell me that it's true.
(Body lines are whatever remains unused in the shared pool at that point in the session — by design, this varies session to session.)

---

## Known tradeoffs, stated plainly for the build

- The **shared pool** and **longform pool** each have multiple consumers competing for a small, finite set of lines. It's likely — and intentional — that a given session never surfaces everything; no single playthrough shows the whole poem.
- The **meta pool** has only a ~6% chance per eligible turn outside of its guaranteed turn-10 appearance, so most sessions will see just one or two of its five lines during normal play.
- **Word-splitting must not rely on a regex that can silently fail to match whitespace** — a real bug during development caused every input, regardless of actual length, to be miscounted as one word. Use a literal-character split (e.g. splitting on a plain space and filtering empty strings), not a fragile whitespace regex.
- **Repeat-detection based on word-overlap was removed entirely** — it produced false positives on any two longer passages that happened to share common function words, which is most pairs of ordinary sentences. Do not reintroduce a "did the user just repeat themselves" check based on word-overlap ratio; if wanted, it should be exact-match only, restricted to very short inputs.

## Open question, still undecided
**Sanitization** — a mechanic where raw input gets stripped of profanity/charged words/punctuation and handed back hollow — remains cut. It's arguably the most thesis-relevant piece of the whole design (the one moment the machine actually *transforms* language, mirroring what an LLM does, versus everywhere else in this piece where it only *selects* pre-written human lines). Worth a final decision before building for real: leave it out, or reintroduce as a rare, late-session event.
