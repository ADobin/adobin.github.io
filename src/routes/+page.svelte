<script lang="ts">
	import Title from '../components/Title.svelte';
</script>

<Title title="Home" description="Welcome to Alex Dobin" />

<h1>Alex Dobin</h1>

<p>
	Software engineer living in <strong>Washington</strong>. Working at Microsoft on
	<a rel="external noreferrer" href="https://powerapps.microsoft.com" target="_blank">Power Apps</a
	>.
</p>

<p>
	<a rel="external noreferrer" href="https://github.com/adobin" target="_blank">
		<img class="mark" src="GitHubMark.png" alt="GitHub" title="github.com/adobin" />
	</a>
	&nbsp;
	<a rel="external noreferrer" href="https://twitter.com/alexdobin" target="_blank">
		<img class="mark" src="TwitterMark.png" alt="Twitter" title="twitter.com/alexdobin" />
	</a>
	&nbsp;
	<a rel="external noreferrer" href="https://www.linkedin.com/in/alex-dobin/" target="_blank">
		<img
			class="mark linkedIn"
			src="LinkedInMark.png"
			alt="LinkedIn"
			title="linkedin.com/in/alex-dobin/"
		/>
	</a>
</p>

<style>
	h1,
	p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		margin: 0 0 0.5em 0;
	}

	.mark {
		width: 32px;
		height: 32px;
	}

	.linkedIn {
		width: unset;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
