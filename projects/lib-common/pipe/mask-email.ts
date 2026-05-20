import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'maskEmail',
    standalone: true,
})
export class MaskEmailPipe implements PipeTransform {
    transform(email: string, visibleChars = 3): string {

        if(email.length < 1 || !email.includes('@')) return email;
            //mutvairam@gmail.com to 'm****@g***l.com'
            const [localParts, domain] = email.split('@');
            const [domainName, ...tldParts] = domain.split('.');
            const tld = tldParts.join('');

            const local = localParts.slice(0, visibleChars);
            const balance = '*'.repeat(Math.max(localParts.length - visibleChars, 0));

            const domainRes = domainName.length >= 2 
                ? domainName[0] + '*'.repeat(Math.max(domainName.length - 2, 0)) + domainName.slice(-1)
                : domainName;

            return `${local}${balance}@${domainRes}.${tld}`;
        }
}