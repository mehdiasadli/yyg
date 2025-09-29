'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { OnSelectHandler } from 'react-day-picker';

interface DatePickerProps {
  minDate?: Date;
  maxDate?: Date;
  minTime?: string; // e.g., "09:00"
  maxTime?: string; // e.g., "18:00"
  formatDate?: string;
  formatTime?: (time?: string) => string;
  placeholder?: string;
  width?: string;
  onSelectDate?: OnSelectHandler<Date>;
  onSelectTime?: (time?: string) => void;
  date?: Date;
  time?: string;
}

export default function DatePicker({
  minDate,
  maxDate,
  minTime,
  maxTime,
  formatDate = 'dd MMM',
  formatTime = (time) => (time ? `, ${time}` : ''),
  placeholder = 'Pick a date and time',
  width = '250px',
  date,
  time,
  onSelectDate,
  onSelectTime,
}: DatePickerProps) {
  const disabled = useMemo(() => {
    const data = [];

    if (minDate) {
      data.push({ before: minDate });
    }

    if (maxDate) {
      data.push({ after: maxDate });
    }

    return data;
  }, [minDate, maxDate]);

  const timeSlots = useMemo(() => {
    const allTimeSlots = [
      '00:00',
      '00:30',
      '01:00',
      '01:30',
      '02:00',
      '02:30',
      '03:00',
      '03:30',
      '04:00',
      '04:30',
      '05:00',
      '05:30',
      '06:00',
      '06:30',
      '07:00',
      '07:30',
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30',
      '22:00',
      '22:30',
      '23:00',
      '23:30',
    ];

    // If no date is selected, return all slots as available
    if (!date) {
      return allTimeSlots.map((slot) => ({ time: slot, available: true }));
    }

    return allTimeSlots.map((slot) => {
      const [hours, minutes] = slot.split(':').map(Number);
      const slotTime = hours * 60 + minutes;

      let available = true;

      // Check minTime constraint (general time range)
      if (minTime) {
        const [minHours, minMinutes] = minTime.split(':').map(Number);
        const minTimeInMinutes = minHours * 60 + minMinutes;
        available = available && slotTime >= minTimeInMinutes;
      }

      // Check maxTime constraint (general time range)
      if (maxTime && available) {
        const [maxHours, maxMinutes] = maxTime.split(':').map(Number);
        const maxTimeInMinutes = maxHours * 60 + maxMinutes;
        available = available && slotTime <= maxTimeInMinutes;
      }

      // Check minDate constraint (specific date-time)
      if (minDate && available) {
        const isSameDay = date.toDateString() === minDate.toDateString();
        if (isSameDay) {
          const minDateTime = minDate.getHours() * 60 + minDate.getMinutes();
          available = available && slotTime >= minDateTime;
        } else if (date < minDate) {
          // If selected date is before minDate, no slots should be available
          available = false;
        }
        // If selected date is after minDate, all slots are available (no additional constraint)
      }

      // Check maxDate constraint (specific date-time)
      if (maxDate && available) {
        const isSameDay = date.toDateString() === maxDate.toDateString();
        if (isSameDay) {
          const maxDateTime = maxDate.getHours() * 60 + maxDate.getMinutes();
          available = available && slotTime <= maxDateTime;
        } else if (date > maxDate) {
          // If selected date is after maxDate, no slots should be available
          available = false;
        }
        // If selected date is before maxDate, all slots are available (no additional constraint)
      }

      return { time: slot, available };
    });
  }, [minDate, maxDate, minTime, maxTime, date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={`relative w-[${width}]`}>
          <Button
            type='button'
            variant='outline'
            mode='input'
            placeholder={!date}
            className='w-full border-none bg-transparent rounded-full py-3 px-4 text-sm font-light text-gray-900 transition-all duration-200 focus:outline-none focus:ring-0'
          >
            <CalendarIcon className='w-4 h-4 text-gray-500' />
            {date ? (
              <span className='font-medium'>
                {format(date, formatDate)}
                <span className='text-gray-500 font-light'>{formatTime(time)}</span>
              </span>
            ) : (
              <span className='text-gray-500 font-light'>{placeholder}</span>
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0 bg-white/95 backdrop-blur-md border border-gray-100/50 shadow-2xl rounded-2xl'
        align='start'
      >
        <div className='flex max-sm:flex-col'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={(newDate, triggeredDate, modifiers, e) => {
              if (newDate) {
                onSelectDate?.(newDate, triggeredDate, modifiers, e);
                onSelectTime?.(undefined);
              }
            }}
            className='p-4 sm:pe-6 font-montserrat'
            disabled={disabled}
          />
          <div className='relative w-full max-sm:h-48 sm:w-44'>
            <div className='absolute inset-0 py-4 max-sm:border-t border-gray-100/50'>
              <ScrollArea className='h-full sm:border-s border-gray-100/50 font-montserrat'>
                <div className='space-y-4'>
                  <div className='flex h-6 shrink-0 items-center px-6'>
                    <p className='text-sm font-medium text-gray-900'>
                      {date ? format(date, 'EEEE, d MMM') : 'Pick a date'}
                    </p>
                  </div>
                  <div className='grid gap-2 px-6 max-sm:grid-cols-2'>
                    {timeSlots.map(({ time: timeSlot, available }) => (
                      <Button
                        key={timeSlot}
                        variant={time === timeSlot ? 'primary' : 'outline'}
                        size='sm'
                        className={`w-full font-light transition-all duration-200 ${
                          time === timeSlot
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-transparent border-gray-200 text-gray-700 hover:bg-gray-50/80 hover:border-gray-300'
                        } ${
                          !available ? 'opacity-50 cursor-not-allowed hover:bg-transparent hover:border-gray-200' : ''
                        }`}
                        onClick={() => onSelectTime?.(timeSlot)}
                        disabled={!available}
                      >
                        {timeSlot}
                      </Button>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
