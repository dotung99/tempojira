import { Popup, Textarea, Select,Input } from '@mobiscroll/react';
// const CALENDAR_ID = 'theacidmedia.net_8l6v679q5j2f7q8lpmcjr4mm3k@group.calendar.google.com';

export default function PopupTest() {
    <Popup
    display="anchored"
    width={400}
    contentPadding={false}
    touchUi={false}
    headerText="Assign task"
    buttons={['ok']}
    // anchor={anchor}
    // isOpen={isOpen}
    // onClose={onClose}
    >
    <div className="mbsc-form-group">
        <Input label="Task" 
        // defaultValue={title} 
        readOnly></Input>
        <Textarea label="Details" 
        // defaultValue={details} 
        placeholder="Add description..."></Textarea>
        <Select
            // data={myData}
            // value={technician}
            // onChange={changeSelected}
            display="anchored"
            touchUi={false}
            label="Technician"
            inputProps={{ placeholder: 'Please select...' }}
        />
    </div>
    </Popup>
}
