import { toastController } from '@ionic/vue';
import { DateTime } from "luxon";

const dateOrdinalSuffix = {
  1: 'st',
  21: 'st',
  31: 'st',
  2: 'nd',
  22: 'nd',
  3: 'rd',
  23: 'rd'
} as any

// TODO Use separate files for specific utilities

// TODO Remove it when HC APIs are fully REST compliant
const hasError = (response: any) => {
  return typeof response.data != "object" || !!response.data._ERROR_MESSAGE_ || !!response.data._ERROR_MESSAGE_LIST_ || !!response.data.error;
}

const showToast = async (message: string, configButtons?: any) => {
  const defaultButtons = [{
    text: 'Dismiss',
    role: 'cancel'
  }]

  if (configButtons) defaultButtons.push(...configButtons);

  const toast = await toastController
    .create({
      message: message,
      duration: 3000,
      position: 'top',
      buttons: defaultButtons
    })
  return toast.present();
}

const handleDateTimeInput = (dateTimeValue: any) => {
  // TODO Handle it in a better way
  // Remove timezone and then convert to timestamp
  // Current date time picker picks browser timezone and there is no supprt to change it
  const dateTime = DateTime.fromISO(dateTimeValue, { setZone: true}).toFormat("yyyy-MM-dd'T'HH:mm:ss")
  return DateTime.fromISO(dateTime).toMillis()
}

const getDateTime = (time: any) => {
  return time ? DateTime.fromMillis(time).toISO() : ''
}

const getDerivedStatusForCount = (count: any) => {
  // TODO: make it dynamic based on coditions or from the stats api, currently always showing as submitted
  return "Submitted"
}

function getDateWithOrdinalSuffix(time: any) {
  if (!time) return '';
  const dateTime = DateTime.fromMillis(time);
  const suffix = dateOrdinalSuffix[dateTime.day] || "th"
  return `${dateTime.day}${suffix} ${dateTime.toFormat("MMM yyyy")}`;
}

export { showToast, hasError, handleDateTimeInput, getDateTime, getDateWithOrdinalSuffix, getDerivedStatusForCount }
