let horrorActive = false

// Type "horror" in chat to start or stop the haunted atmosphere
player.onChat("horror", function () {
    horrorActive = !(horrorActive)
    if (horrorActive) {
        gameplay.timeSet(gameplay.time(MIDNIGHT))
        gameplay.setWeather(THUNDER)
        player.execute("playsound ambient.cave @a")
        player.say("§4Something is watching you...")
    } else {
        gameplay.timeSet(gameplay.time(DAY))
        gameplay.setWeather(CLEAR)
        mobs.clearEffect(mobs.target(ALL_PLAYERS))
        player.say("§aThe darkness fades.")
    }
})

// Type "scare" in chat for an instant jump scare
player.onChat("scare", function () {
    mobs.applyEffect(BLINDNESS, mobs.target(NEAREST_PLAYER), 4, 1)
    player.execute("playsound mob.warden.roar @p")
    mobs.spawn(WARDEN, pos(3, 0, 3))
    gameplay.title(mobs.target(NEAREST_PLAYER), "§4RUN", "§7It found you")
})

// Randomly triggers creepy events while walking when horror mode is on
player.onTravelled(WALK, function () {
    if (horrorActive && Math.randomRange(1, 25) == 1) {
        let event = Math.randomRange(1, 4)
        if (event == 1) {
            // Sudden blindness and cave noise
            mobs.applyEffect(BLINDNESS, mobs.target(NEAREST_PLAYER), 3, 1)
            player.execute("playsound ambient.cave @p")
        } else if (event == 2) {
            // Creepy footsteps and whisper behind the player
            player.execute("playsound mob.endermen.stare @p")
            player.say("§8§oDid you hear that behind you?")
        } else if (event == 3) {
            // Lightning strike nearby with a zombie spawn
            mobs.spawn(LIGHTNING_BOLT, pos(6, 0, 6))
            mobs.spawn(ZOMBIE, pos(6, 0, 6))
        } else {
            // Place a carved pumpkin nearby
            blocks.place(CARVED_PUMPKIN, pos(2, 0, 2))
            player.execute("playsound block.bell.hit @p")
        }
    }
})

// Breaking cobblestone has a small chance to spawn silverfish and play a shriek
blocks.onBlockBroken(COBBLESTONE, function () {
    if (horrorActive && Math.randomRange(1, 5) == 1) {
        player.execute("playsound mob.ghast.scream @p")
        mobs.spawn(SILVERFISH, pos(1, 0, 1))
    }
})
