import { useState } from 'react';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function HistoryPage() {
  const [selected, setSelected] = useState<Date>();

  return (
    <div>
      <DayPicker mode='single' selected={selected} onSelect={setSelected} />
    </div>
  );
}
