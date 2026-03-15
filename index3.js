document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const wordDisplay = document.getElementById('word-display');
  const keyboard = document.getElementById('keyboard');
  const remainingGuessesEl = document.getElementById('remaining-guesses');
  const gameMessageEl = document.getElementById('game-message');
  const resetBtn = document.getElementById('reset-btn');
  
  // Hangman SVG parts
  const hangmanParts = {
    head: document.getElementById('head'),
    body: document.getElementById('body'),
    leftArm: document.getElementById('left-arm'),
    rightArm: document.getElementById('right-arm'),
    leftLeg: document.getElementById('left-leg'),
    rightLeg: document.getElementById('right-leg'),
    face: document.getElementById('face')
  };
  
  // Game variables
  let selectedWord = '';
  let correctLetters = [];
  let wrongLetters = [];
  let remainingGuesses = 6;
  let gameOver = false;
  
  // Categories and words
  const wordCategories = {
    animals: ['TIGER', 'LION', 'DOG', 'BEAR', 'KANGAROO'], 
    countries: ['PALESTINE', 'BRAZIL', 'CANADA', 'JAPAN', 'GERMANY', 'AUSTRALIA', 'SAUDIARABIA', 'AMERICA'],
    misc: ['ELECTRICITY', 'DONKEY', 'HARDWARE', 'XEROX', 'TRANSISTOR', 'COMPUTER', 'DESKTOP',
          'ENGINEERING', 'HANGMAN', 'CIRCUIT', 'IMAGINATION', 'ROBOT', 'MEMORY', 'POWER',
          'SUBMARINE', 'CHESS', 'RESISTANCE', 'MATRIX', 'FUNCTION', 'LASER', 'MECHANISM',
          'BODYGUARD', 'TITANIC', 'GLOBAL', 'OZONE', 'BRIDGE', 'TECHNOLOGY', 'SPIDER', 'UN',
          'PYRAMID', 'SPHERE', 'MEMBER', 'WARNING', 'YOURSELF', 'SCREEN', 'LANGUAGE', 'ELE',
          'SYSTEM', 'INTERNET', 'PARAMETER', 'TRAFFIC', 'NETWORK', 'FILTER', 'NUCLEUS', 'R',
          'AUTOMATIC', 'MICROPHONE', 'CASSETTE', 'OPERATION', 'COUNTRY', 'BEAUTIFUL', 'MIS',
          'PICTURE', 'TEACHER', 'SUPERMAN', 'UNDERTAKER', 'ALARM', 'PROCESS', 'KEYBOARD',
          'ELECTRON', 'CERTIFICATE', 'GRANDFATHER', 'LANDMARK', 'RELATIVITY', 'ERASER',
          'DESIGN', 'FOOTBALL', 'HUMAN', 'MUSICIAN', 'EGYPTIAN', 'ELEPHANT', 'QUEEN', 'REC',
          'MESSAGE', 'WALLPAPER', 'NATIONALITY', 'ANSWER', 'WRONG', 'STATEMENT', 'FOREST',
          'PUZZLE', 'VOLTAGE', 'CURRENT', 'MATHEMATICS', 'WISDOM', 'DREAM', 'SUPERMARKET',
          'DATABASE', 'COLLECTION', 'BARRIER', 'PROJECT', 'SUNLIGHT', 'FIGURE', 'GRAPH',
          'BATTLE', 'HUNDRED', 'SIGNAL', 'THOUSAND', 'TRANSFORMATION', 'DAUGHTER', 'FLOWER',
          'COMMUNICATION', 'MICROWAVE', 'ELECTRONIC', 'PEACE', 'WIRELESS', 'DELETE', 'WIND',
          'BRAIN', 'CONTROL', 'PROPHET', 'FREEDOM', 'HARBOUR', 'CONFIDENCE', 'POSITIVE',
          'HARVEST', 'HUNGER', 'WOMAN', 'CHILDREN', 'STRANGER', 'GARDEN', 'PLEASURE',
          'BETWEEN', 'RECOGNITION', 'TOMORROW', 'AUTUMN', 'MONKEY', 'SPRING', 'WINTER', 'M',
          'CLASSIFICATION', 'TYPEWRITER', 'SUCCESS', 'DIFFERENCE', 'ACOUSTICS', 'ASTRONOMY',
          'AGREEMENT', 'SORROW', 'CHRISTMAS', 'SILVER', 'BIRTHDAY', 'CHAMPIONSHIP', 'FRIEN',
          'COMFORTABLE', 'DIFFUSION', 'MURDER', 'POLICEMAN', 'SCIENCE', 'DESERT', 'BASKETB',
          'BLOOD', 'FUNERAL', 'SILENCE', 'GARMENT', 'MERCHANT', 'SPIRIT', 'PUNISHMENT', 'S',
          'MEASUREMENT', 'OCEAN', 'DIGITAL', 'ILLUSION', 'TYRANT', 'CASTLE', 'PASSION', 'P',
          'MAGICIAN', 'REMEDY', 'KNOWLEDGE', 'THRESHOLD', 'NUMBER', 'VISION', 'EXPECTATION',
          'ABSENCE', 'MYSTERY', 'MORNING', 'DEVICE', 'THOUGHTS', 'SPIRIT', 'FUTURE', 'IMPOSTER',
          'MOUNTAIN', 'TREASURE', 'MACHINE', 'WHISPERING', 'ETERNITY', 'REFLECTION', 'OCCU',
          'ACHIEVEMENT', 'LIGHTNING', 'SECRET', 'ENVIRONMENT', 'SHEPHERD', 'CONFUSION', 'E',
          'GRAVE', 'PROMISE', 'HONOUR', 'REWARD', 'TEMPLE', 'DISTANCE', 'EAGLE', 'SATURN',
          'FINGER', 'BELIEF', 'CRYSTAL', 'FASHION', 'DIRECTION', 'CAPTAIN', 'MOMENT', 'IMP',
          'PERMISSION', 'LOGIC', 'ANALYSIS', 'PASSWORD', 'ENGLISH', 'EQUALIZER', 'SIMULATIVE',
          'EMOTION', 'BATTLE', 'EXPRESSION', 'SCISSORS', 'TROUSERS', 'GLASSES', 'DEPARTMEN',
          'DICTIONARY', 'CHEMISTRY', 'INDUCTION', 'DETAIL', 'WIDOW', 'WEALTH', 'HEALTH',
          'DISASTER', 'VOLCANO', 'POVERTY', 'LIMITATION', 'PERFECT', 'INTELLIGENCE', 'INFIDEL',
          'FAILURE', 'IGNORANCE', 'DESTINATION', 'SOURCE', 'RESORT', 'SATISFACTION', 'EXAM',
          'FREQUENCY', 'SELECTION', 'SUBSTITUTION', 'KINGDOM', 'PATTERN', 'MANAGEMENT',
          'SITUATION', 'MULTIPLY', 'TREATMENT', 'DOLLAR', 'INTUITION', 'CHAPTER', 'MAGNET',
          'DESIRE', 'COMMAND', 'ACTION', 'CONSCIOUSNESS', 'ENEMY', 'SECURITY', 'OBJECT',
          'HAPPEN', 'HAPPINESS', 'WORRY', 'METHOD', 'TOLERANCE', 'ERROR', 'HESITATION',
          'RECORD', 'TONGUE', 'SUPPLY', 'VIBRATION', 'STRESS', 'DESPAIR', 'RESTAURANT', 'M',
          'TELEVISION', 'VIDEO', 'AUDIO', 'LAYER', 'MIXTURE', 'DOORBELL', 'COUSIN', 'BEARD',
          'FINANCE', 'PRODUCTION', 'INVISIBLE', 'EXCITEMENT', 'AFTERNOON', 'OFFICE', 'ALPH',
          'ILLUSTRATION', 'VALLEY', 'APARTMENT', 'NECESSARY', 'SHORTAGE', 'ALMOST', 'FURNI',
          'BLANKET', 'SUGGESTION', 'OVERFLOW', 'DEMONSTRATION', 'CHALLENGE', 'COMPACT', 'K',
          'TOWER', 'QUESTION', 'PROBLEM', 'PRESSURE', 'BEAST', 'ENCOURAGEMENT', 'AFRAID',
          'CAVITY', 'APPEARANCE', 'WONDERFUL', 'MATTER', 'DIMENSION', 'BUSINESS', 'DOUBT',
          'CONVERSATION', 'REACTION', 'PSYCHOLOGY', 'SUPERSTITION', 'SMASH', 'HORSESHOE',
          'SURPRISE', 'NOTHING', 'LADDER', 'OPPOSITE', 'REALITY', 'GENIUS', 'STRING', 'DIS',
          'DESTRUCTION', 'EXPENSIVE', 'PAINTING', 'CHICKEN', 'WISHING', 'PROFESSION', 'ENG',
          'HATRED', 'POSSESSION', 'CRITICISM', 'ZEBRA', 'HARMONY', 'PERSONALITY', 'OVERCOM',
          'ADDITION', 'SUBTRACTION', 'CIPHER', 'ENCRYPTION', 'COMPRESSION', 'EXTENSION',
          'BLESSING', 'MEETING', 'DIFFICULTY', 'WEAPON', 'AGAINST', 'EXTERNAL', 'INTERNAL',
          'LEGEND', 'SERVANT', 'SECONDARY', 'LICENSE', 'DIRECTORY', 'STATISTICS', 'GENERATION',
          'ATTRACTION', 'SENSITIVITY', 'MAGNIFICATION', 'SOMEONE', 'SYMPTOM', 'RECIPE', 'M',
          'SERVICE', 'FAMILY', 'ISLAND', 'PLANET', 'BUTTERFLY', 'DIVING', 'STRENGTH', 'MIS',
          'EXTREME', 'OPPORTUNITY', 'ILLUMINATION', 'CABLE', 'CONFLICT', 'INTERFERENCE',
          'RECEIVER', 'TRANSMITTER', 'CHANNEL', 'COMPANY', 'GROCERY', 'DEVIL', 'ANGEL', 'A',
          'EXACTLY', 'DOCUMENT', 'TUTORIAL', 'SOUND', 'VOICE', 'ABBREVIATION', 'ABDOMEN',
          'ABRUPT', 'ABSOLUTE', 'ABSORPTION', 'ABSTRACT', 'ACADEMY', 'ACCELERATION', 'ACCE',
          'ACCIDENT', 'ACCOUNT', 'ACIDIFICATION', 'ACTRESS', 'ADAPTATION', 'ADDICTION', 'A',
          'ADJUSTMENT', 'ADMIRATION', 'ADOPTION', 'ADVANCED', 'ADVENTURE', 'ADVERTISEMENT',
          'AGENDA', 'AIRPORT', 'ALGORITHM', 'ALLOCATION', 'ALUMINIUM', 'AMBIGUITY', 'AMBIT',
          'AMPHIBIAN', 'ANAESTHESIA', 'ANALOGY', 'ANCHOR', 'ANIMATION', 'ANODE', 'CATHODE',
          'APPARENT', 'APPENDIX', 'APPROVAL', 'APPROXIMATION', 'ARBITRARY', 'ARCHITECTURE',
          'ARITHMETIC', 'ARRANGEMENT', 'ARTICLE', 'ASCENDING', 'ASHAMED', 'ASLEEP', 'ASSASIN',
          'ASSEMBLY', 'ASTONISHMENT', 'ATMOSPHERE', 'AWFUL', 'BACHELOR', 'BACKBONE', 'BACK',
          'BACTERIA', 'BALANCE', 'BALLOON', 'BANANA', 'BARBECUE', 'BASEBALL', 'BEAKER', 'B',
          'BEGGAR', 'BEHAVIOUR', 'BENEFIT', 'BIDIRECTIONAL', 'BIOLOGY', 'BLACKBOARD', 'BLA',
          'BLADDER', 'BLEEDING', 'BLENDER', 'BONUS', 'BOTTLE', 'BRACKET', 'BRANCH', 'BRILL',
          'BUBBLE', 'BUCKET', 'BUDGET', 'BULLET', 'BURGLAR', 'BUTCHER', 'BYPASS', 'CAFETER',
          'CALCULATOR', 'CALIBRATION', 'CAMPAIGN', 'CANCELLATION', 'CANDIDATE', 'CANDLE',
          'CARPENTER', 'CARRIAGE', 'CARTOON', 'CASCADE', 'CASUAL', 'CATALYST', 'CATEGORY',
          'CEMENT', 'CEREMONY', 'CHAIRMAN', 'CHECKOUT', 'CHIMNEY', 'CHOCOLATE', 'CIGARETTE',
          'CIRCUMFERENCE', 'CIVILIZATION', 'CLASSROOM', 'CLEARANCE', 'CLIENT', 'COCONUT',
          'COINCIDENCE', 'COLLEAGUE', 'COMFORTABLE', 'COMPETITION', 'KANGAROO', 'KIDNAP',
          'JOURNAL', 'JOCKEY', 'ITERATION', 'ISOMETRIC', 'ISOLATION', 'INVITATION', 'INTER',
          'INSTITUTION', 'INJECTION', 'HUMANITY', 'HOUSEKEEPER', 'HISTORY', 'HEAVEN', 'GUI',
          'GREENHOUSE', 'GLORY', 'FOUNDATION', 'FORMULA', 'FLUCTUATION', 'FICTION', 'EXTRA',
          'EMISSION', 'ELASTICITY', 'EARTHQUAKE', 'DYNAMIC', 'DOCTORATE', 'DIVORCE', 'DERI NIGHTMARE', 'VIRTUE', 'DESCRIPTION']
  };
  
  // Initialize game
  function initGame() {
    // Reset game state
    correctLetters = [];
    wrongLetters = [];
    remainingGuesses = 6;
    gameOver = false;
    gameMessageEl.textContent = '';
    
    // Select random category and word
    const categories = Object.keys(wordCategories);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const words = wordCategories[randomCategory];
    selectedWord = words[Math.floor(Math.random() * words.length)];
    
    // Update UI
    document.getElementById('category').textContent = `Category: ${randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1)}`;
    remainingGuessesEl.textContent = `Remaining guesses: ${remainingGuesses}`;
    
    // Hide all hangman parts
    Object.values(hangmanParts).forEach(part => {
      part.style.display = 'none';
    });
    
    // Create word display
    wordDisplay.innerHTML = '';
    for (let i = 0; i < selectedWord.length; i++) {
      const letterEl = document.createElement('div');
      letterEl.classList.add('word-letter');
      letterEl.dataset.letter = selectedWord[i];
      wordDisplay.appendChild(letterEl);
    }
    
    // Create keyboard
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const keyEl = document.createElement('button');
      keyEl.classList.add('keyboard-letter');
      keyEl.textContent = letter;
      keyEl.dataset.letter = letter;
      keyEl.addEventListener('click', () => handleGuess(letter));
      keyboard.appendChild(keyEl);
    }
  }
  
  // Handle letter guess
  function handleGuess(letter) {
    if (gameOver || wrongLetters.includes(letter) || correctLetters.includes(letter)) return;
    
    if (selectedWord.includes(letter)) {
      // Correct guess
      correctLetters.push(letter);
      updateWordDisplay();
      
      // Mark keyboard letter as correct
      document.querySelector(`.keyboard-letter[data-letter="${letter}"]`).classList.add('correct', 'used');
      
      // Check if player won
      if (checkWin()) {
        gameOver = true;
        gameMessageEl.textContent = 'Congratulations! You won!';
        gameMessageEl.style.color = 'green';
      }
    } else {
      // Wrong guess
      wrongLetters.push(letter);
      remainingGuesses--;
      remainingGuessesEl.textContent = `Remaining guesses: ${remainingGuesses}`;
      
      // Mark keyboard letter as wrong
      document.querySelector(`.keyboard-letter[data-letter="${letter}"]`).classList.add('wrong', 'used');
      
      // Show hangman part
      updateHangmanDrawing();
      
      // Check if player lost
      if (remainingGuesses === 0) {
        gameOver = true;
        gameMessageEl.textContent = `Game Over! The word was: ${selectedWord}`;
        gameMessageEl.style.color = 'red';
        
        // Show face
        hangmanParts.face.style.display = 'block';
        
        // Reveal all letters
        document.querySelectorAll('.word-letter').forEach(el => {
          el.textContent = el.dataset.letter;
        });
      }
    }
  }
  
  // Update hangman drawing
  function updateHangmanDrawing() {
    switch(wrongLetters.length) {
      case 1: hangmanParts.head.style.display = 'block'; break;
      case 2: hangmanParts.body.style.display = 'block'; break;
      case 3: hangmanParts.leftArm.style.display = 'block'; break;
      case 4: hangmanParts.rightArm.style.display = 'block'; break;
      case 5: hangmanParts.leftLeg.style.display = 'block'; break;
      case 6: hangmanParts.rightLeg.style.display = 'block'; break;
    }
  }
  
  // Update word display with correctly guessed letters
  function updateWordDisplay() {
    document.querySelectorAll('.word-letter').forEach(el => {
      const letter = el.dataset.letter;
      if (correctLetters.includes(letter)) {
        el.textContent = letter;
      }
    });
  }
  
  // Check if player won
  function checkWin() {
    return selectedWord.split('').every(letter => correctLetters.includes(letter));
  }
  
  // Keyboard event listener
  document.addEventListener('keydown', e => {
    if (/^[a-z]$/i.test(e.key)) {
      handleGuess(e.key.toUpperCase());
    }
  });
  
  // Reset button
  resetBtn.addEventListener('click', initGame);
  
  // Start the game
  initGame();
});