// Candidatos al Balón de Oro (base de datos en memoria)
const candidates = [
    { id: "dembele", name: "Ousmane Dembélé", team: "Paris Saint-Germain", country: "Francia", flag: "/images/flags/fr.svg", photo: "/images/players/dembele.jpg", position: "Delantero", age: 28 },
    { id: "yamal", name: "Lamine Yamal", team: "FC Barcelona", country: "España", flag: "/images/flags/es.svg", photo: "/images/players/yamal.jpg", position: "Extremo derecho", age: 18 },
    { id: "vinicius", name: "Vinícius Júnior", team: "Real Madrid", country: "Brasil", flag: "/images/flags/br.svg", photo: "/images/players/vinicius.jpg", position: "Extremo izquierdo", age: 25 },
    { id: "haaland", name: "Erling Haaland", team: "Manchester City", country: "Noruega", flag: "/images/flags/no.svg", photo: "/images/players/haaland.jpg", position: "Delantero centro", age: 25 },
    { id: "mbappe", name: "Kylian Mbappé", team: "Real Madrid", country: "Francia", flag: "/images/flags/fr.svg", photo: "/images/players/mbappe.jpg", position: "Delantero", age: 27 },
    { id: "raphinha", name: "Raphinha", team: "FC Barcelona", country: "Brasil", flag: "/images/flags/br.svg", photo: "/images/players/raphinha.jpg", position: "Extremo", age: 29 },
];

const reasons = [
    { id: "temporada", label: "Rendimiento en la temporada" },
    { id: "titulos", label: "Títulos ganados" },
    { id: "goles", label: "Goles y asistencias" },
    { id: "seleccion", label: "Impacto con su selección" },
    { id: "talento", label: "Talento y proyección" },
];

const voterCountries = ["Perú", "Argentina", "Brasil", "Chile", "Colombia", "España", "México", "Otro"];

const daysAgo = (d) => new Date(Date.now() - d * 24 * 60 * 60 * 1000);

// Votos registrados: única fuente de verdad para las estadísticas
const votes = [
    { voterName: "Carlos Ramos", voterCountry: "Perú", candidateId: "dembele", reason: "temporada", confidence: 90, comment: "Su mejor temporada, fue decisivo en todas las rondas.", votedAt: daysAgo(6) },
    { voterName: "Lucía Fernández", voterCountry: "España", candidateId: "yamal", reason: "talento", confidence: 80, comment: "A su edad ya marca diferencias.", votedAt: daysAgo(5) },
    { voterName: "Diego Salas", voterCountry: "Perú", candidateId: "dembele", reason: "titulos", confidence: 75, comment: "", votedAt: daysAgo(5) },
    { voterName: "Ana Torres", voterCountry: "Colombia", candidateId: "vinicius", reason: "goles", confidence: 70, comment: "Desequilibra cada partido.", votedAt: daysAgo(4) },
    { voterName: "Mateo Rossi", voterCountry: "Argentina", candidateId: "haaland", reason: "goles", confidence: 85, comment: "Los números no mienten.", votedAt: daysAgo(4) },
    { voterName: "Sofía Márquez", voterCountry: "México", candidateId: "yamal", reason: "temporada", confidence: 95, comment: "", votedAt: daysAgo(3) },
    { voterName: "Bruno Costa", voterCountry: "Brasil", candidateId: "raphinha", reason: "goles", confidence: 88, comment: "Fue el motor del equipo todo el año.", votedAt: daysAgo(3) },
    { voterName: "Javier Pinto", voterCountry: "Chile", candidateId: "dembele", reason: "temporada", confidence: 65, comment: "", votedAt: daysAgo(2) },
    { voterName: "Valeria Núñez", voterCountry: "Perú", candidateId: "mbappe", reason: "seleccion", confidence: 60, comment: "Siempre aparece con Francia.", votedAt: daysAgo(2) },
    { voterName: "Andrés Gil", voterCountry: "España", candidateId: "yamal", reason: "talento", confidence: 100, comment: "El futuro ya llegó.", votedAt: daysAgo(1) },
    { voterName: "Paolo Vera", voterCountry: "Perú", candidateId: "vinicius", reason: "temporada", confidence: 72, comment: "", votedAt: daysAgo(1) },
    { voterName: "Renata Lima", voterCountry: "Brasil", candidateId: "raphinha", reason: "seleccion", confidence: 78, comment: "Merece el reconocimiento.", votedAt: daysAgo(1) },
];

const findCandidate = (id) => candidates.find((c) => c.id === id);

const buildStats = () => {
    const counts = {};
    votes.forEach((v) => { counts[v.candidateId] = (counts[v.candidateId] || 0) + 1; });

    const total = votes.length;

    return candidates
        .map((c) => {
            const count = counts[c.id] || 0;
            return { ...c, votes: count, percentage: total === 0 ? 0 : Math.round((count / total) * 100) };
        })
        .sort((a, b) => b.votes - a.votes);
};

const buildReasonStats = () => {
    const counts = {};
    votes.forEach((v) => { counts[v.reason] = (counts[v.reason] || 0) + 1; });

    const total = votes.length;

    return reasons
        .map((r) => {
            const count = counts[r.id] || 0;
            return { ...r, votes: count, percentage: total === 0 ? 0 : Math.round((count / total) * 100) };
        })
        .sort((a, b) => b.votes - a.votes);
};

const ballonDeOro = (req, res) => {
    const stats = buildStats();
    const totalVotes = votes.length;
    const leader = totalVotes > 0 ? stats[0] : null;

    const averageConfidence = totalVotes === 0
        ? 0
        : Math.round(votes.reduce((sum, v) => sum + Number(v.confidence || 0), 0) / totalVotes);

    const recentVotes = [...votes].reverse().map((v) => ({
        ...v,
        candidate: findCandidate(v.candidateId),
        reasonLabel: (reasons.find((r) => r.id === v.reason) || {}).label || "Sin especificar",
    }));

    res.render("ballonDeOro", {
        title: "Balón de Oro",
        candidates,
        reasons,
        voterCountries,
        stats,
        reasonStats: buildReasonStats(),
        totalVotes,
        leader,
        averageConfidence,
        recentVotes,
    });
};

const votarBallonDeOro = (req, res) => {
    const { voterName, voterCountry, candidateId, reason, confidence, comment } = req.body;
    const candidate = findCandidate(candidateId);

    if (candidate) {
        votes.push({
            voterName: voterName && voterName.trim() ? voterName.trim() : "Anónimo",
            voterCountry: voterCountry || "Otro",
            candidateId: candidate.id,
            reason: reason || "temporada",
            confidence: Number(confidence) || 50,
            comment: comment ? comment.trim() : "",
            votedAt: new Date(),
        });
    }

    res.redirect("/balon-de-oro");
};

module.exports = { ballonDeOro, votarBallonDeOro };
