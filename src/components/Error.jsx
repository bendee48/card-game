function Error() {
  return (
    <div className="error-message">
      <p>Ah, the cards can't be fetched at the moment.</p>
      <p>There can only be 3 reasons why.</p>
      <ol className="error-list">
        <li>You currently don't have an internet connection.</li>
        <li>The Pokémon API is down.</li>
        <li>Somebody has hacked the game and desecrated my eloquent ironclad code.</li>
        <li className="skill-error">I've messed something up.</li>
      </ol>
    </div>
  )
}

export default Error;