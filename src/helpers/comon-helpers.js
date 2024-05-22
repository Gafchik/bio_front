export const sleep = (milliseconds,action, actionParams) => {
    setTimeout(() => {action(actionParams)}, milliseconds);
}
export const downloadPdfHelper = (response,fileName) => {
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName+'.pdf';
    link.click();
    window.URL.revokeObjectURL(url);
}