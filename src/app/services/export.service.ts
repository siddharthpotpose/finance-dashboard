import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExportService {
  downloadCsv(filename: string, rows: Record<string, string | number | null>[]): void {
    if (!rows.length) {
      return;
    }

    const headers = Object.keys(rows[0]);
    const csvLines = [headers.join(',')];

    rows.forEach((row) => {
      const values = headers.map((key) => this.escapeCsvValue(row[key]));
      csvLines.push(values.join(','));
    });

    this.triggerDownload(filename, csvLines.join('\n'), 'text/csv');
  }

  downloadJson(filename: string, payload: unknown): void {
    this.triggerDownload(filename, JSON.stringify(payload, null, 2), 'application/json');
  }

  private escapeCsvValue(value: string | number | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    const raw = String(value);
    if (raw.includes(',') || raw.includes('"') || raw.includes('\n')) {
      return `"${raw.replace(/"/g, '""')}"`;
    }

    return raw;
  }

  private triggerDownload(filename: string, content: string, type: string): void {
    if (typeof document === 'undefined') {
      return;
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
