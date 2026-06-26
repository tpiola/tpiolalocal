'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard, Users, BarChart3, Settings,
    ShoppingCart, TrendingUp, TrendingDown, ArrowUpRight,
    Bell, Search, Zap, Target, DollarSign, Activity
} from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const revenueData = [
  { day: 'Seg', receita: 8200, leads: 45 },
  { day: 'Ter', receita: 11500, leads: 67 },
  { day: 'Qua', receita: 9800, leads: 52 },
  { day: 'Qui', receita: 15200, leads: 89 },
  { day: 'Sex', receita: 13400, leads: 74 },
  { day: 'Sab', receita: 7600, leads: 38 },
  { day: 'Dom', receita: 10100, leads: 55 },
  ];

const pipelineData = [
  { name: 'Prospecção', value: 35, color: '#6366f1' },
  { name: 'Qualificação', value: 25, color: '#8b5cf6' },
  { name: 'Proposta', value: 20, color: '#a78bfa' },
  { name: 'Negociação', value: 12, color: '#c4b5fd' },
  { name: 'Fechado', value: 8, color: '#10b981' },
  ];

const kpis = [
  {
        label: 'Receita Total',
        value: 'R$ 58.4k',
        change: '+12.5%',
        up: true,
        icon: DollarSign,
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.1)',
  },
  {
        label: 'Total de Leads',
        value: '847',
        change: '+8.2%',
        up: true,
        icon: Users,
        color: '#6366f1',
        bg: 'rgba(99, 102, 241, 0.1)',
  },
  {
        label: 'Taxa de Conversão',
        value: '4.8%',
        change: '-0.3%',
        up: false,
        icon: Target,
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.1)',
  },
  {
        label: 'Meta do Mês',
        value: '89%',
        change: '+5.1%',
        up: true,
        icon: Activity,
        color: '#ec4899',
        bg: 'rgba(236, 72, 153, 0.1)',
  },
  ];

const recentLeads = [
  { name: 'Farmácia Econômica', contact: 'João P.', status: 'Prospecção', value: 'R$ 5.400', avatar: 'FE' },
  { name: 'Rede Farmácia Popular', contact: 'Ana C.', status: 'Qualificação', value: 'R$ 12.800', avatar: 'RF' },
  { name: 'Drogaria São Paulo', contact: 'Carlos S.', status: 'Proposta', value: 'R$ 24.500', avatar: 'DS' },
  { name: 'Clínica Bem Estar', contact: 'Pedro L.', status: 'Negociação', value: 'R$ 8.900', avatar: 'CB' },
  { name: 'Hospital Regional', contact: 'Lucia M.', status: 'Fechado', value: 'R$ 45.000', avatar: 'HR' },
  ];

const statusColors: Record<string, string> = {
    'Prospecção': 'rgba(99, 102, 241, 0.2)',
    'Qualificação': 'rgba(139, 92, 246, 0.2)',
    'Proposta': 'rgba(245, 158, 11, 0.2)',
    'Negociação': 'rgba(59, 130, 246, 0.2)',
    'Fechado': 'rgba(16, 185, 129, 0.2)',
};

const statusText: Record<string, string> = {
    'Prospecção': '#818cf8',
    'Qualificação': '#a78bfa',
    'Proposta': '#fbbf24',
    'Negociação': '#60a5fa',
    'Fechado': '#34d399',
};

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', active: true },
  { href: '/crm', icon: ShoppingCart, label: 'CRM Pipeline', active: false },
  { href: '/analytics', icon: BarChart3, label: 'Analytics', active: false },
  { href: '/leads', icon: Users, label: 'Leads', active: false },
  { href: '/settings', icon: Settings, label: 'Configurações', active: false },
  ];

export default function Dashboard() {
    const [activeNav, setActiveNav] = useState('Dashboard');

    return (
          <div style={{ display: 'flex', height: '100vh', background: '#0a0a0f', color: '#f0f0f5', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
            <aside style={{
                      width: '220px',
                      minWidth: '220px',
                      background: '#0d0d14',
                      borderRight: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '20px 0',
            }}>
      {/* Logo */}
              <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                                  width: '32px', height: '32px', borderRadius: '8px',
                                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Zap size={16} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#f0f0f5' }}>TpiolaLocal</div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Hermes Intelligence</div>
                  </div>
                </div>
              </div>

      {/* Nav */}
              <nav style={{ flex: 1, padding: '16px 12px' }}>
      {navItems.map((item) => (
                    <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                      <div
                        onClick={() => setActiveNav(item.label)}
                        style={{
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            padding: '10px 12px', borderRadius: '8px', marginBottom: '4px',
                                            cursor: 'pointer', transition: 'all 0.15s ease',
                                            background: activeNav === item.label ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
                                            color: activeNav === item.label ? '#a78bfa' : '#6b7280',
                                            border: activeNav === item.label ? '1px solid rgba(124, 58, 237, 0.25)' : '1px solid transparent',
                        }}
                      >
                        <item.icon size={16} />
                        <span style={{ fontSize: '13px', fontWeight: '500' }}>{item.label}</span>
                      </div>
                    </Link>
                  ))}
              </nav>

      {/* Agent Status */}
              <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{
                              background: 'rgba(16, 185, 129, 0.1)',
                              border: '1px solid rgba(16, 185, 129, 0.2)',
                              borderRadius: '8px', padding: '10px 12px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                                      width: '8px', height: '8px', borderRadius: '50%',
                                      background: '#10b981', boxShadow: '0 0 8px #10b981',
                    }} />
                    <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Agente Ativo</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>Hermes v6.0 Online</div>
                </div>
              </div>
            </aside>

      {/* Main */}
            <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
              <header style={{
                          padding: '16px 28px',
                          borderBottom: '1px solid rgba(255,255,255,0.06)',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          background: 'rgba(13,13,20,0.8)', backdropFilter: 'blur(10px)',
                          position: 'sticky', top: 0, zIndex: 10,
              }}>
                <div>
                  <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#f0f0f5' }}>Dashboard</h1>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Visão geral do negócio</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                                  display: 'flex', alignItems: 'center', gap: '8px',
                                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                                  borderRadius: '8px', padding: '8px 12px',
                  }}>
                    <Search size={14} color="#6b7280" />
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>Buscar...</span>
                  </div>
                  <div style={{
                                  width: '36px', height: '36px', borderRadius: '8px',
                                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  }}>
                    <Bell size={16} color="#6b7280" />
                  </div>
                </div>
              </header>

      {/* Content */}
              <div style={{ padding: '24px 28px', flex: 1 }}>
      {/* KPI Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
      {kpis.map((kpi) => (
                      <div key={kpi.label} style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '12px', padding: '20px',
                                        transition: 'all 0.2s ease',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <div style={{
                                                width: '36px', height: '36px', borderRadius: '8px',
                                                background: kpi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <kpi.icon size={18} color={kpi.color} />
                          </div>
                          <div style={{
                                                display: 'flex', alignItems: 'center', gap: '4px',
                                                background: kpi.up ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                                                color: kpi.up ? '#10b981' : '#ef4444',
                                                padding: '3px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '600',
                          }}>
        {kpi.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {kpi.change}
                          </div>
                        </div>
                        <div style={{ fontSize: '26px', fontWeight: '700', color: '#f0f0f5', marginBottom: '4px' }}>{kpi.value}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>{kpi.label}</div>
                      </div>
                    ))}
                </div>

      {/* Charts Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>
      {/* Revenue Chart */}
                  <div style={{
                                  background: 'rgba(255,255,255,0.04)',
                                  border: '1px solid rgba(255,255,255,0.08)',
                                  borderRadius: '12px', padding: '20px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#f0f0f5' }}>Receita Semanal</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>Últimos 7 dias</div>
                      </div>
                      <div style={{ fontSize: '22px', fontWeight: '700', color: '#10b981' }}>R$ 75.8k</div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 11 }} />
                        <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
                        <Tooltip
                          contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                          formatter={(v: number) => [`R$ ${v.toLocaleString('pt-BR')}`, 'Receita']}
                        />
                        <Area type="monotone" dataKey="receita" stroke="#7c3aed" strokeWidth={2} fill="url(#colorReceita)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

      {/* Pipeline Distribution */}
                  <div style={{
                                  background: 'rgba(255,255,255,0.04)',
                                  border: '1px solid rgba(255,255,255,0.08)',
                                  borderRadius: '12px', padding: '20px',
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#f0f0f5', marginBottom: '4px' }}>Pipeline</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '20px' }}>Distribuição por estágio</div>
                    <ResponsiveContainer width="100%" height={140}>
                      <PieChart>
                        <Pie data={pipelineData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
      {pipelineData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                          formatter={(v: number) => [`${v}%`, 'Percentual']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ marginTop: '8px' }}>
      {pipelineData.map((item) => (
                          <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color }} />
                              <span style={{ fontSize: '11px', color: '#9ca3af' }}>{item.name}</span>
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: '600', color: '#f0f0f5' }}>{item.value}%</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

      {/* Recent Leads */}
                <div style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '12px', padding: '20px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#f0f0f5' }}>Leads Recentes</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Pipeline ativo</div>
                    </div>
                    <Link href="/crm" style={{
                                      display: 'flex', alignItems: 'center', gap: '4px',
                                      fontSize: '12px', color: '#a78bfa', textDecoration: 'none',
                    }}>
                      Ver todos <ArrowUpRight size={12} />
                    </Link>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      {['Empresa', 'Contato', 'Status', 'Valor'].map((h) => (
                              <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                            ))}
                        </tr>
                      </thead>
                      <tbody>
      {recentLeads.map((lead) => (
                            <tr key={lead.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                              <td style={{ padding: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{
                                                                width: '32px', height: '32px', borderRadius: '8px',
                                                                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                fontSize: '11px', fontWeight: '700', color: 'white',
                                  }}>{lead.avatar}</div>
                                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#f0f0f5' }}>{lead.name}</span>
                                </div>
                              </td>
                              <td style={{ padding: '12px', fontSize: '13px', color: '#9ca3af' }}>{lead.contact}</td>
                              <td style={{ padding: '12px' }}>
                                <span style={{
                                                            background: statusColors[lead.status] || 'rgba(255,255,255,0.1)',
                                                            color: statusText[lead.status] || '#9ca3af',
                                                            padding: '3px 10px', borderRadius: '999px',
                                                            fontSize: '11px', fontWeight: '600',
                                }}>{lead.status}</span>
                              </td>
                              <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#10b981' }}>{lead.value}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </main>
          </div>
        );
}
