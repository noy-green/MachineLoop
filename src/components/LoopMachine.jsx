import React, { useEffect, useState, useRef } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

export default function LoopMachine() {
    let audio1 = new Audio('/loops/future_funk_beats_25.mp3')
    let audio2 = new Audio('/loops/stutter_breakbeats_16.mp3')
    let audio3 = new Audio('/loops/Bass Warwick heavy funk groove on E 120 BPM.mp3')
    let audio4 = new Audio('/loops/electric guitar coutry slide 120bpm - B.mp3')
    let audio5 = new Audio('/loops/GrooveB_120bpm_Tanggu.mp3')
    let audio6 = new Audio('/loops/PAS3GROOVE1.03B.mp3')
    let audio7 = new Audio('/loops/MazePolitics_120_Perc.mp3')
    let audio8 = new Audio('/loops/FUD_120_StompySlosh.mp3')
    let audio9 = new Audio('/loops/SilentStar_120_Em_OrganSynth.mp3')
    const classes = useStyles();
    const theme = useTheme();
    const [pads, setPads] = useState([
        { id: "1", name: "Funk Beats", isPlayng: false, audio: audio1, inTheLIst: false },
        { id: "2", name: "Stutter Breakbeats", isPlayng: false, audio: audio2, inTheLIst: false },
        { id: "3", name: "heavy funk groove", isPlayng: false, audio: audio3, inTheLIst: false },
        { id: "4", name: "Electric Guitar", isPlayng: false, audio: audio4, inTheLIst: false },
        { id: "5", name: "Darbuka", isPlayng: false, audio: audio5, inTheLIst: false },
        { id: "6", name: "Cool Groove", isPlayng: false, audio: audio6, inTheLIst: false },
        { id: "7", name: "Creak", isPlayng: false, audio: audio7, inTheLIst: false },
        { id: "8", name: "Drums", isPlayng: false, audio: audio8, inTheLIst: false },
        { id: "9", name: "Terror", isPlayng: false, audio: audio9, inTheLIst: false }
    ])
    const [playingLoop, setPlayingLoop] = useState([])
    const [keepPlaying, setKeepPlaying] = useState(false)
    const [timer, setTimer] = useState(1)
    const timerRef = useRef(timer)
    timerRef.current = timer
    const [isInterval, setIsInterval] = useState(false)
 

    // The function listens to two states: "timer" and "keepPlaying". That is, as soon as one of them changes it runs again.
    // The "timer" changes every eight seconds (the duration of the sound files), in each run it plays everyone which is in the
    // "playingLoop" array. 
    // If new sound join - they will start playing.
    // In case "keepPlaying" becomes a false. it does not run the loop.
    useEffect(() => {
        if (keepPlaying) {
            for (let i = 0; i < playingLoop.length; i++) {
                playingLoop[i].audio.loop = true
                playingLoop[i].audio.play()
            }
        }
    }, [keepPlaying, timer])


    // Go through a loop on each of the audio so that they stop playing at that moment,
    //  In addition it updates the state of the "KeepPlaying" to false in order to prevent playback when it reaches the "useEffect" function
    function stopAll() {
        for (let i = 0; i < playingLoop.length; i++) {
            playingLoop[i].audio.pause()
        }
        setKeepPlaying(false)

    }


    // Changes the state of "KeepPlaying" to true, and checks whether there is an initialized interval,
    //  if not, defines it
    function playAll() {
        setKeepPlaying(true)
        if (!isInterval) {
            setIsInterval(true)
            timerOn()
        }
    }

    // Changes the timer state every eight seconds.
    function timerOn() {
        setInterval(() => {
            // useRef returns a mutable ref object whose .current property is initialized to the 
            // passed argument (initialValue). 
            // The returned object will persist for the full lifetime of the component.
            setTimer(timerRef.current + 1)
        }, 8000);
    }
    


    // Removes the song from "playingloop" so that it does not enter the next iteration, 
    // and pauses it so that it stops playing at that moment.
    function handaleOff(p) {
        let play = playingLoop.filter(l => l.id === p.id)
        play[0].audio.pause()
        let newplayingLoop = [...playingLoop]
        newplayingLoop = newplayingLoop.filter(l => l.id !== p.id)
        setPlayingLoop(newplayingLoop)
        console.log(newplayingLoop)
    }

    // Insert the new song to the "playingLoop" array.
    function insertToLoop(p) {
        let newplayingLoop = [...playingLoop, { audio: p.audio, id: p.id }]
        setPlayingLoop(newplayingLoop)
        console.log(newplayingLoop)
    }


    // Occurs when the user changes the toggle of one of the pads, checks the status and sorts:
    // If it is true, it sends to the function "insertToLoop" If it is false, it sends to the function "handleOff"
    function handleChange(p) {
        let newPads = [...pads]
        newPads[p.id - 1].inTheLIst = !newPads[p.id - 1].inTheLIst
        if (newPads[p.id - 1].inTheLIst === true) {
            console.log("on")
            insertToLoop(p)
        }
        if (newPads[p.id - 1].inTheLIst === false) {
            console.log("of")
            handaleOff(p)
        }
        setPads(newPads)
    }


    return (
        <div id="body">
            <Typography component="h1" variant="h1" id="hedear">
                Machine Loop
            </Typography>
            <button onClick={playAll}><PlayCircleOutlineIcon style={{ fontSize: 40, color: 'black' }} ></PlayCircleOutlineIcon></button>
            <button onClick={stopAll}><StopOutlinedIcon style={{ fontSize: 40, color: 'black' }}></StopOutlinedIcon></button>
            <div id="pads">
                {pads.map(p => (
                    <Card key={p.id} className={classes.root, "pad"}>
                        <div className={classes.details, "padDiv"}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5">
                                    {p.name}
                                </Typography>
                            </CardContent>
                            <div className={classes.controls, "button"}>
                                <Switch
                                    onChange={() => { handleChange(p) }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

        </div>
    )
}
