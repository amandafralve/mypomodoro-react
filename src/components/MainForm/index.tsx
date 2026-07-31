import { Input } from "../Input"
import { Cycles } from "../Cycles"
import { Button } from "../Button"
import { PlayCircleIcon } from "lucide-react"

export function MainForm() {
    return (
        <form className='form' action="">
            <div className="formRow">
                <Input id='meuInput' labelText='Task' type='text' placeholder='Type your task'/>
            </div>

            <div className="formRow">
                <p>Lorem ipsum dolor sit amet.</p>
            </div>

            <div>
                <Cycles/>
            </div>

            <div className="formRow">
                <Button icon={<PlayCircleIcon />} color='green'/>
            </div>
        </form>
    )
}