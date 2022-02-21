# PRG09-design-patterns-strategy-tank-completed

Startercode voor de opdracht Strategy Tank [PRG09]

![screenshot strategy tank](docs/images/screenshot-strategy-tank.png)

Als programmeur sta je vaak voor complexe uitdagingen. Sommige van deze uitdagingen komen in de praktijk veelvuldig voor. Dit is dan ook de reden dat er voor deze situaties standaard oplossingen zijn bedacht. Dit maakt het mogelijk om het praktijkprobleem volgens een vast patroon op te lossen. Een dergelijk patroon wordt Best Practice of Design Pattern genoemd. 

Deze patronen bestaan al erg lang, maar nog steeds worden ze veelvuldig toegepast. Waarschijnlijk heb je al met heel wat patronen gewerkt maar besefte je het niet. In frameworks komen deze patronen veelvuldig voor, zeker door de modulair opbouw en het generieke karakter van de code. 

Wanneer je in staat bent deze patronen te herkennen, zal de werking van bijvoorbeeld een framework je sneller duidelijk worden. Ook zal je sneller de code kunnen doorgronden. Verder leer je hoe je zelf dergelijke patronen kunt toepassen. Hierdoor leer je ook hoe code modulair kunt opzetten waardoor het beter uit te breiden en makkelijker te onderhouden is. Een belangrijke eigenschap voor elke programmeur die een stapje verder wilt komen.

## Uitzoeken

In deze opdracht ga je met het eerste patroon aan de slag: Het Strategy Pattern. Je gaat dit patroon toepassen in een spelletje, waarvan de startcode al gegeven is. 

Design patterns kunnen niet bestaat zonder achterliggende technieken als Polymorfisme, Interfaces en Abstracte Classes. In de volgende filmpjes leer je hier meer over. Ook zal het eerste filmpje nog wat OOP principes herhalen.  
-	[Interfaces en abstracte classes](https://hrnl.sharepoint.com/:v:/s/CMGT/Efd6EUslXS1Bo5bblzAjMQsBQCDLUtKgn2i6i0A7jJWoiQ?e=MB5Aw3)
-	[Polymorfisme](https://hrnl.sharepoint.com/:v:/s/CMGT/EVuFAG2z_yJHjDL0ES3GLxcBpWE7lOx6_E5FMOj8HputKg?e=aWqhMD)

Deze technieken zijn nodig voor de toepassing van het Strategy Pattern. In het volgende filmpje wordt dit aan de hand van een praktisch voorbeeld uitgelegd: 
-	[Strategy Pattern](https://hrnl.sharepoint.com/:v:/s/CMGT/EVyEYfYWWK5GgFi4vi8HuRoBnNhpgGqKTIE7cl8elrDQOw?e=GiniR4)

Een tip zou zijn om het patroon door te nemen en vervolgens een klein prototype te maken (met bijv de code uit de video). Hierdoor krijg je een beter idee waar je het patroon voor zou kunnen gebruiken. Maak eerst een klassendiagram voordat je de code voor de opdracht gaat uitwerken.

## Praktijkopdracht – Strategy Tank

In deze opdracht werk je een spelletje uit met een tank. De tank zal moeten overleven in een golf van vijanden. Er zijn drie verschillende vijanden (light, medium, heavy) en elke vijand is uit te schakelen met een bepaald projectiel. 
De spelerstank moet over een ammo box rijden om dit type projectiel te activeren. Op dat moment wisselt het type projectiel dat je afvuurt naar het type dat afgebeeld staat op de ammo box. Standaard begin je met bullets en je kunt maar 1 type projectiel per keer afvuren. 
Elk projectiel heeft zijn eigen karakteristieken. Bijvoorbeeld:

1.	Bullet
Schiet twee keer per seconde. 
Vernietigt **Light tank**
2.	Rocket
Schiet een keer per twee seconden
Vernietigt **Medium tank** 
3.	Door jou verzonnen projectiel met door jou verzonnen gedrag die de **Heavy tank** uitschakelt. Bijvoorbeeld:
    - Een Mine die je tank achterlaat en op dezelfde plek blijft liggen. [relatief eenvoudig]
    -	Een Homing Missile die na afvuren zelf een Heavy Tank opzoekt [moeilijker]
    -	Een andere, door jou bedacht projectiel…

Voordat je gaat beginnen aan de uitwerking maak je eerst een klassendiagram waarbij je het Strategy Pattern verwerkt. 

Natuurlijk is het extra leuk om een score toe te voegen, een restart optie en een game over screen. Dit is niet verplicht om de opdracht te halen. 

## Leerdoelen

- Ik ken de werking van het Strategy Pattern en kan bepalen en onderbouwen wanneer dit patroon een meerwaarde heeft voor een praktisch probleem
- Ik kan het patroon toepassen in code volgens de voorschriften van het patroon
- Ik kan uitleggen wat in het geval van het Strategy Pattern het nut en het voordeel is van *loose coupling*. 

## Toetsing

Dit onderdeel wordt getoetst door middel van een mondeling. Tijdens het mondeling wordt aan de hand van de code gekeken of de leerdoelen bereikt zijn. 
Aan de hand van de uitwerking zal onderbouwd moeten worden:
- Het patroon is volgens de voorgeschreven werking van het patroon toegepast
- Hoe het patroon werkt (zowel a.d.h.v. het klassendiagram als in code)
- Welk nut/voordeel het patroon heeft in deze situatie
- Hoe de oplossing eruit zou zien als het patroon niet toegepast zou zijn
Voorwaarde voor deelname
- De code is door jou zelf uitgewerkt
- Je hebt een klassendiagram aangeleverd waarmee je de uitwerking van de opdracht hebt ontworpen.
- De code is, voor het mondeling, geupload op Cumlaude 

## Bronnen

- Refactoring.guru, https://refactoring.guru/design-patterns/strategy 
- Source making, https://sourcemaking.com/design_patterns/strategy 
- Head First Design Patterns, ISBN 978-0596007126
- Design Patterns. Elements of Reusable Object-Oriented Software, ISBN 978-0201633610

