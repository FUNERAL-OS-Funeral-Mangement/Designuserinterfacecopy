import { create } from 'zustand';

export interface Appointment {
  id: string;
  familyName: string;
  caseId: string;
  type: 'Arrangement Conference' | 'Service Planning - Virtual' | 'Service Planning - On Location';
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM AM/PM format
  contactName: string;
  contactPhone: string;
  notes?: string;
  createdAt: string;
}

interface AppointmentStore {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Appointment;
  getAppointmentsByDate: (date: string) => Appointment[];
  getTodaysAppointments: () => Appointment[];
  getUpcomingAppointments: () => Appointment[];
  deleteAppointment: (id: string) => void;
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [
    {
      id: '1',
      familyName: 'Johnson Family',
      caseId: 'case-1',
      type: 'Service Planning - Virtual',
      date: '2025-12-18',
      time: '10:00 AM',
      contactName: 'Mary Johnson',
      contactPhone: '(555) 123-4567',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      familyName: 'Smith Family',
      caseId: 'case-2',
      type: 'Service Planning - Virtual',
      date: '2025-12-18',
      time: '2:00 PM',
      contactName: 'John Smith',
      contactPhone: '(555) 234-5678',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      familyName: 'Martinez Family',
      caseId: 'case-3',
      type: 'Service Planning - On Location',
      date: '2025-12-19',
      time: '11:00 AM',
      contactName: 'Carlos Martinez',
      contactPhone: '(555) 345-6789',
      createdAt: new Date().toISOString(),
    },
  ],

  addAppointment: (appointment) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `appointment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      appointments: [...state.appointments, newAppointment],
    }));

    return newAppointment;
  },

  getAppointmentsByDate: (date) => {
    return get().appointments.filter((apt) => apt.date === date);
  },

  getTodaysAppointments: () => {
    const today = new Date().toISOString().split('T')[0];
    return get().appointments.filter((apt) => apt.date === today);
  },

  getUpcomingAppointments: () => {
    const today = new Date().toISOString().split('T')[0];
    return get()
      .appointments.filter((apt) => apt.date >= today)
      .sort((a, b) => {
        if (a.date === b.date) {
          return a.time.localeCompare(b.time);
        }
        return a.date.localeCompare(b.date);
      });
  },

  deleteAppointment: (id) => {
    set((state) => ({
      appointments: state.appointments.filter((apt) => apt.id !== id),
    }));
  },
}));