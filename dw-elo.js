const episodeTitles = [
    "An Unearthly Child",
    "100,000 BC",
    "The Daleks",
    "The Edge of Destruction",
    "Marco Polo",
    "The Keys of Marinus",
    "The Aztecs",
    "The Sensorites",
    "The Reign of Terror",
    "Planet of Giants",
    "The Dalek Invasion of Earth",
    "The Rescue",
    "The Romans",
    "The Web Planet",
    "The Crusade",
    "The Space Museum",
    "The Chase",
    "The Time Meddler",
    "Galaxy 4",
    "Mission to the Unknown",
    "The Myth Makers",
    "The Daleks' Master Plan",
    "The Massacre of St Bartholomew's Eve",
    "The Ark",
    "The Celestial Toymaker",
    "The Gunfighters",
    "The Savages",
    "The War Machines",
    "The Smugglers",
    "The Tenth Planet",
    "The Power of the Daleks",
    "The Highlanders",
    "The Underwater Menace",
    "The Moonbase",
    "The Macra Terror",
    "The Faceless Ones",
    "The Evil of the Daleks",
    "The Tomb of the Cybermen",
    "The Abominable Snowmen",
    "The Ice Warriors",
    "The Enemy of the World",
    "The Web of Fear",
    "Fury from the Deep",
    "The Wheel in Space",
    "The Dominators",
    "The Mind Robber",
    "The Invasion",
    "The Krotons",
    "The Seeds of Death",
    "The Space Pirates",
    "The War Games",
    "Spearhead from Space",
    "Doctor Who and the Silurians",
    "The Ambassadors of Death",
    "Inferno",
    "Terror of the Autons",
    "The Mind of Evil",
    "The Claws of Axos",
    "Colony in Space",
    "The Dæmons",
    "Day of the Daleks",
    "The Curse of Peladon",
    "The Sea Devils",
    "The Mutants",
    "The Time Monster",
    "The Three Doctors",
    "Carnival of Monsters",
    "Frontier in Space",
    "Planet of the Daleks",
    "The Green Death",
    "The Time Warrior",
    "Invasion of the Dinosaurs",
    "Death to the Daleks",
    "The Monster of Peladon",
    "Planet of the Spiders",
    "Robot",
    "The Ark in Space",
    "The Sontaran Experiment",
    "Genesis of the Daleks",
    "Revenge of the Cybermen",
    "Terror of the Zygons",
    "Planet of Evil",
    "Pyramids of Mars",
    "The Android Invasion",
    "The Brain of Morbius",
    "The Seeds of Doom",
    "The Masque of Mandragora",
    "The Hand of Fear",
    "The Deadly Assassin",
    "The Face of Evil",
    "The Robots of Death",
    "The Talons of Weng-Chiang",
    "Horror of Fang Rock",
    "The Invisible Enemy",
    "Image of the Fendahl",
    "The Sun Makers",
    "Underworld",
    "The Invasion of Time",
    "The Ribos Operation",
    "The Pirate Planet",
    "The Stones of Blood",
    "The Androids of Tara",
    "The Power of Kroll",
    "The Armageddon Factor",
    "Destiny of the Daleks",
    "City of Death",
    "The Creature from the Pit",
    "Nightmare of Eden",
    "The Horns of Nimon",
    "Shada",
    "The Leisure Hive",
    "Meglos",
    "Full Circle",
    "State of Decay",
    "Warriors' Gate",
    "The Keeper of Traken",
    "Logopolis",
    "Castrovalva",
    "Four to Doomsday",
    "Kinda",
    "The Visitation",
    "Black Orchid",
    "Earthshock",
    "Time-Flight",
    "Arc of Infinity",
    "Snakedance",
    "Mawdryn Undead",
    "Terminus",
    "Enlightenment",
    "The King's Demons",
    "The Five Doctors",
    "Warriors of the Deep",
    "The Awakening",
    "Frontios",
    "Resurrection of the Daleks",
    "Planet of Fire",
    "The Caves of Androzani",
    "The Twin Dilemma",
    "Attack of the Cybermen",
    "Vengeance on Varos",
    "The Mark of the Rani",
    "The Two Doctors",
    "Timelash",
    "Revelation of the Daleks",
    "The Mysterious Planet",
    "Mindwarp",
    "Terror of the Vervoids",
    "The Ultimate Foe",
    "Time and the Rani",
    "Paradise Towers",
    "Delta and the Bannermen",
    "Dragonfire",
    "Remembrance of the Daleks",
    "The Happiness Patrol",
    "Silver Nemesis",
    "The Greatest Show in the Galaxy",
    "Battlefield",
    "Ghost Light",
    "The Curse of Fenric",
    "Survival",
    "Doctor Who",
    "Rose",
    "The End of the World",
    "The Unquiet Dead",
    "Aliens of London",
    "Dalek",
    "The Long Game",
    "Father's Day",
    "The Empty Child",
    "Boom Town",
    "Bad Wolf",
    "The Christmas Invasion",
    "New Earth",
    "Tooth and Claw",
    "School Reunion",
    "The Girl in the Fireplace",
    "Rise of the Cybermen",
    "The Idiot's Lantern",
    "The Impossible Planet",
    "Love and Monsters",
    "Fear Her",
    "Doomsday",
    "The Runaway Bride",
    "Smith & Jones",
    "The Shakespeare Code",
    "Gridlock",
    "Evolution of the Daleks",
    "The Lazarus Experiment",
    "42",
    "Human Nature",
    "Blink",
    "Utopia/Last of the Time Lords",
    "Voyage of the Damned",
    "Partners in Crime",
    "The Fires of Pompeii",
    "Planet of the Ood",
    "The Sontaran Stratagem",
    "The Doctor's Daughter",
    "The Unicorn and the Wasp",
    "Silence in the Library",
    "Midnight",
    "Turn Left",
    "Journey's End",
    "The Next Doctor",
    "Planet of the Dead",
    "The Waters of Mars",
    "The End of Time",
    "The Eleventh Hour",
    "The Beast Below",
    "Victory of the Daleks",
    "The Time of Angels",
    "The Vampires of Venice",
    "Amy's Choice",
    "Cold Blood",
    "Vincent and the Doctor",
    "The Lodger",
    "The Big Bang",
    "A Christmas Carol",
    "The Impossible Astronaut",
    "The Curse of the Black Spot",
    "The Doctor's Wife",
    "The Rebel Flesh",
    "A Good Man Goes to War",
    "Let's Kill Hitler",
    "Night Terrors",
    "The Girl Who Waited",
    "The God Complex",
    "Closing Time",
    "The Wedding of River Song",
    "The Doctor, the Widow and the Wardrobe",
    "Asylum of the Daleks",
    "Dinosaurs on a Spaceship",
    "A Town Called Mercy",
    "The Power of Three",
    "The Angels Take Manhattan",
    "The Snowmen",
    "The Bells of Saint John",
    "The Rings of Akhaten",
    "Cold War",
    "Hide",
    "Journey to the Centre of the TARDIS",
    "The Crimson Horror",
    "Nightmare in Silver",
    "The Name of the Doctor",
    "The Day of the Doctor",
    "The Time of the Doctor",
    "Deep Breath",
    "Into the Dalek",
    "Robot of Sherwood",
    "Listen",
    "Time Heist",
    "The Caretaker",
    "Kill the Moon",
    "Mummy on the Orient Express",
    "Flatline",
    "In the Forest of the Night",
    "Death in Heaven",
    "Last Christmas",
    "The Magician's Apprentice",
    "Under the Lake / Before the Flood",
    "The Girl Who Died",
    "The Woman Who Lived",
    "The Zygon Invasion",
    "Sleep No More",
    "Face the Raven",
    "Heaven Sent",
    "Hell Bent",
    "The Husbands of River Song",
    "The Return of Doctor Mysterio",
    "The Pilot",
    "Smile",
    "Thin Ice",
    "Knock Knock",
    "Oxygen",
    "Extremis",
    "The Pyramid at the End of the World",
    "The Lie of the Land",
    "Empress of Mars",
    "The Eaters of Light",
    "World Enough and Time",
    "Twice Upon A Time",
    "The Woman Who Fell to Earth",
    "The Ghost Monument",
    "Rosa",
    "Arachnids in the UK",
    "The Tsuranga Conundrum",
    "Demons of the Punjab",
    "Kerblam!",
    "The Witchfinders",
    "It Takes You Away",
    "The Battle of Ranskoor av Kolos",
    "Resolution",
    "Spyfall",
    "Orphan 55",
    "Nikola Tesla's Night of Terror",
    "Fugitive of the Judoon",
    "Praxeus",
    "Can You Hear Me?",
    "The Haunting of Villa Diodati",
    "Ascension of the Cybermen",
    "Revolution of the Daleks",
    "The Halloween Apocalypse",
    "War of the Sontarans",
    "Once, Upon Time",
    "Village of the Angels",
    "Survivors of the Flux",
    "The Vanquishers",
    "Eve of the Daleks",
    "Legend of the Sea Devils",
    "The Power of the Doctor",
    "The Star Beast",
    "Wild Blue Yonder",
    "The Giggle",
    "The Church on Ruby Road",
]
const doctors = [
    "1st (Hartnell)", 
    "2nd (Troughton)", 
    "3rd (Pertwee)", 
    "4th (Baker)", 
    "5th (Davison)", 
    "6th (Baker)", 
    "7th (McCoy)", 
    "8th (McGann)", 
    "9th (Eccleston)", 
    "10th (Tennant)", 
    "11th (Smith)",
    "12th (Capaldi)",
    "13th (Whittaker)",
    "14th (Tennant)",
    "15th (Gatwa)"
]
const drEps = [
    [0, 29], [30, 50], [51, 74], [75, 116], [117, 136], [137, 147], [148, 159], [160, 160], [161, 170], [171, 206], [207, 245], [246, 280], [281, 309], [310, 312], [313, 313]
]

const extension = "";
const docOrSeries = ["Doctor", "Doctors"];