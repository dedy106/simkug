window.app_kopeg_pinjaman_transaksi_fBillingk = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjaman_transaksi_fBillingk.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjaman_transaksi_fBillingk";						
			this.maximize();
			owner.childFormConfig(this, "mainButtonClick","Form Akrual Jasa Pinjaman : Koreksi", 0);			
			//------------------------ login data ------------------------	
			uses("portalui_saiCBB;portalui_saiCBB;portalui_datePicker;portalui_radioButton");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,20,200,20],caption:"Periode",readOnly:true,tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18],selectDate:[this,"doSelectDate"]});
			this.cbbPerLama = new portalui_saiCB(this,{bound:[720,21,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
			this.eBukti = new portalui_saiLabelEdit(this,{bound:[20,23,290,20],caption:"No Akru",readOnly:true});
			this.bGen = new portalui_button(this,{bound:[320,23,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.cbbNbLama = new portalui_saiCBB(this,{bound:[720,23,200,20],caption:"No Akru Lama",readOnly:true, btnClick:[this,"FindBtnClick"], btnRefreshClick:[this,"doLoadData"]});
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,24,290,20],caption:"No Dok. Ref",tag:1});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,26,500,20],caption:"Keterangan",tag:1});
			this.ePokok = new portalui_saiLabelEdit(this,{bound:[720,26,200,20],caption:"Total Pokok", tipeText:ttNilai, text:"0", readOnly: true});			
			this.cbbApp = new portalui_saiCBBL(this,{bound:[20,28,200,20],caption:"NIK Approval", btnClick:[this,"FindBtnClick"], readOnly:true,tag:2});			
			this.eJasa = new portalui_saiLabelEdit(this,{bound:[720,28,200,20],caption:"Total Jasa", tipeText:ttNilai, text:"0",readOnly: true});			
			this.cbbAkun = new portalui_saiCBBL(this,{bound:[20,29,200,20],caption:"Akun Pdpt Jasa", btnClick:[this,"FindBtnClick"], readOnly:true,tag:2});			
			this.eTagihan = new portalui_saiLabelEdit(this,{bound:[720,29,200,20],caption:"Total Tagihan", tipeText:ttNilai, text:"0",readOnly: true});			
			
			this.p2 = new portalui_panel(this,{bound:[20,35,900,200],caption:"Daftar Jurnal Akru Pinjaman"});
			this.sg2 = new portalui_saiGrid(this.p2,{bound:[1,20,898,175],colCount:8,
			    colWidth:[[0,1,2,3,4,5,6,7],[80,120,80,180,100,100,100,100]],
				colTitle:["Kode Loker","Nama Loker","Akun ARJasa","Nama Akun","Total Pinjaman","Total Pokok","Total Jasa","Total Tagihan"],
                colFormat:[[4,5,6,7],[cfNilai, cfNilai, cfNilai, cfNilai]],dblClick:[this,"doDblClick"],
                readOnly:true, defaultRow:1,nilaiChange:[this,"doSgChange"]}); 
				
			this.p1 = new portalui_panel(this,{bound:[20,36,900,310],caption:"Daftar Pinjaman untuk diAkru"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,290],colCount:14,
			    colWidth:[[0,1,2,3,4,5,6,7,8,9, 10,11,12],[80,0,140,60,120,80,50,50,50,80,  80,80,0,0]],
				colTitle:["No Kontrak","Kd Nasabah","Nama Nasabah","Tanggal","Keterangan","Nilai Pinj.","Jk Waktu","Persen","Cicil Ke","Nilai Pokok",
				          "Nilai Jasa","Nilai Tagihan","Akun Piu.Jasa","No Pinj"],
                colFormat:[[5,6,7,8,9,10,11],[cfNilai, cfNilai, cfNilai, cfNilai ,cfNilai ,cfNilai ,cfNilai]],
                readOnly:true, colHide:[[1,12,13],true], defaultRow:1,nilaiChange:[this,"doSgChange"],tag:9}); 
			this.rearrangeChild(10,22);
			setTipeButton(tbUbahHapus);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());
			
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_pinjbill_m where kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cbbPerLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cbbPerLama.setText(this.app._periode);
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjaman_transaksi_fBillingk]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjaman_transaksi_fBillingk.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_transaksi_fBillingk.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		else if (sender == this.app._mainForm.bSimpan){
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		}else if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		else if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{		
			if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.eBukti.setTag(0);
			else this.eBukti.setTag(9);		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjbill_m","no_bill",this.app._lokasi+"-BPJ"+this.ePeriode.getText().substr(2,4)+".","0000"));
						sql.add(" update kop_pinjbill_m set no_link='"+this.eBukti.getText()+"',no_del = concat(no_bill,'r') where no_bill ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_pinjbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link,no_ref,akun_pdpt) "+
							    " select concat(no_bill,'r'),no_dokumen,keterangan,'"+this.dTgl.getDateString()+"',nilai,'"+this.ePeriode.getText()+"',kode_pp,kode_lokasi,nik_app,'"+this.app._userLog+"',now(),'F',kode_curr,kurs,no_bill,'-','-',akun_pdpt "+
								" from kop_pinjbill_m where no_bill = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");																		
						sql.add(" insert into kop_pinjbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_bill,'r'),no_dokumen,'"+this.dTgl.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.ePeriode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_pinjbill_j where no_bill = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("insert into kop_pinjbill_d (no_bill,no_pinj,no_kontrak,kode_lokasi,cicilan_ke,npokok,nbunga,akun_pjasa,akun_pdpt,dc,no_del)"+
								" select concat(no_bill,'r'),no_pinj,no_kontrak,kode_lokasi,cicilan_ke,npokok,nbunga,akun_pjasa,akun_pdpt,'C','BATAL' "+ 
								" from kop_pinjbill_d where no_bill = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" update kop_pinj_sch set status_gen='0', no_bill='-' where no_bill='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.nb = this.eBukti.getText();
					}
					else{
						sql.add(" delete from kop_pinjbill_m where no_bill='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" delete from kop_pinjbill_j where no_bill='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" delete from kop_pinjbill_d where no_bill='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" update kop_pinj_sch set status_gen='0', no_bill='-' where no_bill='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.nb = this.cbbNbLama.getText();
					}
					sql.add("insert into kop_pinjbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link,no_ref,akun_pdpt) values  "+
							"('"+this.nb+"','"+this.eDok.getText()+"','"+this.eKet.getText()+"','"+this.dTgl.getDateString()+"',"+parseNilai(this.eTagihan.getText())+",'"+this.ePeriode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cbbApp.getText()+"','"+this.app._userLog+"',now(),'F','IDR',1,'-','-','-','"+this.cbbAkun.getText()+"')");
					
					var scr1 = "insert into kop_pinjbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						       "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var baris1 = true;
					var line = undefined;
					var idx = 0;
					for (var i=0; i<this.sg2.rows.getLength(); i++){
						if (!baris1) { scr1 += ",";}	
						scr1 += "('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.sg2.getCell(2,i)+
							 	"','"+this.eKet.getText()+"','D',"+parseNilai(this.sg2.getCell(6,i))+",'"+this.app._kodePP+"','-',"+
								"'"+this.app._lokasi+"','PINJBILL','ARJS','"+this.ePeriode.getText()+
								"','IDR',1,'"+this.app._userLog+"',now())";
						baris1 = false;
						idx++;
					}					
					scr1 += ",";
					scr1 += "('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.cbbAkun.getText()+
							"','"+this.eKet.getText()+"','C',"+parseNilai(this.eJasa.getText())+",'"+this.app._kodePP+"','-',"+
							"'"+this.app._lokasi+"','PINJBILL','PDPT','"+this.ePeriode.getText()+
							"','IDR',1,'"+this.app._userLog+"',now())";
					sql.add(scr1);
					sql.add("insert into kop_pinjbill_d(no_bill,no_pinj,no_kontrak,kode_lokasi,cicilan_ke,npokok,nbunga,akun_pjasa,akun_pdpt,dc,no_del) "+
							"select '"+this.nb+"',a.no_pinj,a.no_kontrak,a.kode_lokasi,g.cicilan_ke, "+
							"       case a.jenis_angs when 'F' then a.nilai_pokok else ((a.nilai_pokok+a.nilai_bunga) - round((a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0))*a.p_bunga/12/100)) end as npokok, "+
							"       case a.jenis_angs when 'F' then a.nilai_bunga else round((a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0))*a.p_bunga/12/100) end as nbunga, "+
							"       a.akun_pjasa,'"+this.cbbAkun.getText()+"','D','-' "+
							"from kop_pinj_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
						    "                  inner join kop_pinj_spb c on c.no_kontrak=a.no_kontrak and a.kode_lokasi=c.kode_lokasi "+
						    "                  inner join spb_m d on c.no_spb=d.no_spb and d.kode_lokasi=c.kode_lokasi "+
						    "                  inner join kas_d e on e.no_bukti=d.no_spb and d.kode_lokasi=e.kode_lokasi "+
						    "                  inner join kas_m f on f.no_kas=e.no_kas and f.kode_lokasi=e.kode_lokasi "+														  
						    "				   inner join kop_pinj_sch g on g.no_kontrak=a.no_kontrak and a.no_pinj=g.no_pinj and a.kode_lokasi=g.kode_lokasi "+
						    "                  left outer join (select x.no_kontrak,x.no_pinj,x.kode_lokasi,sum(case x.dc when 'D' then x.npokok+x.nbunga else -(x.npokok+x.nbunga) end) as nangs "+
						    "                                   from kop_pinjangs_d x                             "+
						    "                                   group by x.no_kontrak,x.no_pinj,x.kode_lokasi) aa "+
						    "                                   on aa.no_kontrak=a.no_kontrak and aa.no_pinj=a.no_pinj and aa.kode_lokasi=a.kode_lokasi  "+ 
						    "                  left outer join (select x.no_kontrak,x.no_pinj,x.kode_lokasi, sum(case x.dc when 'D' then x.nbunga else -x.nbunga end) as nbill "+
						    "                                   from kop_pinjbill_d x  "+
						    "						            where x.no_bill <> '"+this.cbbNbLama.getText()+"' and x.kode_lokasi = '"+this.app._lokasi+"' "+
							"                                   group by x.no_kontrak,x.no_pinj,x.kode_lokasi) bb "+
						    "                                   on bb.no_kontrak=a.no_kontrak and bb.no_pinj=a.no_pinj and bb.kode_lokasi=a.kode_lokasi "+
						    "where a.progress = '1' and a.status_aktif='1' and d.no_del='-' and f.no_del='-' and g.status_gen='0' and "+
						    "      (a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0)) > 0 and a.kode_lokasi = '"+this.app._lokasi+"' and g.tgl_angs between '"+this.ePeriode.getText().substr(0,4)+'-'+this.ePeriode.getText().substr(4,2)+'-01'+"' and '"+this.ePeriode.getText().substr(0,4)+'-'+this.ePeriode.getText().substr(4,2)+'-31'+"' ");
										
					sql.add("update kop_pinj_sch a, kop_pinjbill_d b set a.status_gen='1', a.no_bill='"+this.nb+
					        "' where a.no_pinj=b.no_pinj and a.no_kontrak=b.no_kontrak and a.cicilan_ke=b.cicilan_ke and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi='"+this.app._lokasi+"' and b.no_bill='"+this.nb+"'");					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.eBukti);		
					this.sg1.clear(1);
				}
				break;
			case "ubah" :	
			    if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode))){
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				if (nilaiToFloat(this.eTagihan.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Total Tagihan tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.periodeLama) > parseFloat(this.ePeriode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode bukti lama.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.ePeriode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.ePeriode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{	
					uses("server_util_arrayList");
					sql = new server_util_arrayList();	
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update kop_pinjbill_m set no_del = concat(no_bill,'r') where no_bill ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_pinjbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link,no_ref,akun_pdpt) "+
							    " select concat(no_bill,'r'),no_dokumen,keterangan,'"+this.dTgl.getDateString()+"',nilai,'"+this.ePeriode.getText()+"',kode_pp,kode_lokasi,nik_app,'"+this.app._userLog+"',now(),'F',kode_curr,kurs,no_bill,'-','-',akun_pdpt "+
								" from kop_pinjbill_m where no_bill = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");																		
						sql.add(" insert into kop_pinjbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_bill,'r'),no_dokumen,'"+this.dTgl.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.ePeriode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_pinjbill_j where no_bill = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("insert into kop_pinjbill_d (no_bill,no_pinj,no_kontrak,kode_lokasi,cicilan_ke,npokok,nbunga,akun_pjasa,akun_pdpt,dc,no_del)"+
								" select concat(no_bill,'r'),no_pinj,no_kontrak,kode_lokasi,cicilan_ke,npokok,nbunga,akun_pjasa,akun_pdpt,'C','BATAL' "+ 
								" from kop_pinjbill_d where no_bill = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" update kop_pinj_sch set status_gen='0', no_bill='-' where no_bill='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					else{
						sql.add(" delete from kop_pinjbill_m where no_bill='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" delete from kop_pinjbill_j where no_bill='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" delete from kop_pinjbill_d where no_bill='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" update kop_pinj_sch set status_gen='0', no_bill='-' where no_bill='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}		
					this.dbLib.execArraySQL(sql);	
				} catch(e){
					alert(e)
				}
			break;	
		}
	},
	doSelectDate: function(sender, y, m, d){
       this.ePeriode.setText(sender.getThnBln());
    },
	doClick: function(sender){
		if (sender == this.bGen){
			this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjbill_m","no_bill",this.app._lokasi+"-BPJ"+this.ePeriode.getText().substr(2,4)+".","0000"));
			this.eDok.setFocus();
		}
	},
	editChange:function(sender){
       this.sg1.clear(1);
	   this.sg1.validasi();
	   this.cb_awal.setText("");this.cb_akhir.setText("");
    },
	doLoadData: function(sender){
		try{			
			if (this.cbbNbLama.getText() != ""){
				this.sg1.clear(1);
				var data = this.dbLib.getDataProvider("select m.kode_loker,m.nama as nama_loker,a.akun_pjasa,n.nama as nama_akun,sum(a.nilai) as totnilai,"+
													  "       sum(case a.jenis_angs when 'F' then a.nilai_bunga else round((a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0))*a.p_bunga/12/100) end) as totbunga, "+
													  "       sum(case a.jenis_angs when 'F' then a.nilai_pokok else ((a.nilai_pokok+a.nilai_bunga) - round((a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0))*a.p_bunga/12/100)) end) as totpokok, "+
													  "       d.periode,d.posted,d.no_dokumen,d.keterangan,d.nik_app,d.akun_pdpt,o.nama as nama_app,p.nama as nama_pdpt "+
													  "from kop_pinj_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
													  "                  inner join kop_pinjbill_d c on c.no_kontrak=a.no_kontrak and c.no_pinj=a.no_pinj and a.kode_lokasi=c.kode_lokasi "+
													  "                  inner join kop_pinjbill_m d on c.no_bill=d.no_bill and d.kode_lokasi=c.kode_lokasi "+
													  "                  inner join kop_loker m on b.kode_loker=m.kode_loker and b.kode_lokasi=m.kode_lokasi "+
													  "                  inner join masakun n on a.akun_pjasa=n.kode_akun and a.kode_lokasi=n.kode_lokasi "+
													  "                  inner join karyawan o on d.nik_app=o.nik and d.kode_lokasi=o.kode_lokasi "+
													  "                  inner join masakun p on d.akun_pdpt=p.kode_akun and d.kode_lokasi=p.kode_lokasi "+
													  "                  left outer join (select x.no_kontrak,x.no_pinj,x.kode_lokasi,sum(case x.dc when 'D' then x.npokok+x.nbunga else -(x.npokok+x.nbunga) end) as nangs "+
													  "                                   from kop_pinjangs_d x "+
													  "                                   group by x.no_kontrak,x.no_pinj,x.kode_lokasi) aa "+
													  "                                   on aa.no_kontrak=a.no_kontrak and aa.no_pinj=a.no_pinj and aa.kode_lokasi=a.kode_lokasi  "+ 
													  "                  left outer join (select x.no_kontrak,x.no_pinj,x.kode_lokasi, sum(case x.dc when 'D' then x.nbunga else -x.nbunga end) as nbill "+
													  "                                   from kop_pinjbill_d x  "+
													  "									  where x.no_bill <> '"+this.cbbNbLama.getText()+"' and x.kode_lokasi = '"+this.app._lokasi+"' "+
													  "                                   group by x.no_kontrak,x.no_pinj,x.kode_lokasi) bb "+
													  "                                   on bb.no_kontrak=a.no_kontrak and bb.no_pinj=a.no_pinj and bb.kode_lokasi=a.kode_lokasi "+
													  "where d.no_bill = '"+this.cbbNbLama.getText()+"' and d.kode_lokasi = '"+this.app._lokasi+"' group by m.kode_loker,a.akun_pjasa order by m.kode_loker,n.kode_akun");
													 
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_loker,line.nama_loker,line.akun_pjasa,line.nama_akun,floatToNilai(line.totnilai),floatToNilai(line.totpokok),floatToNilai(line.totbunga),floatToNilai(parseFloat(line.totpokok)+parseFloat(line.totbunga))]);
					}
					this.sg2.validasi();
					this.posted = line.posted;
					this.perLama = line.periode;
					
					this.eDok.setText(line.no_dokumen);
					this.eKet.setText(line.keterangan);
					this.cbbApp.setText(line.nik_app,line.nama_app);
					this.cbbAkun.setText(line.akun_pdpt,line.nama_pdpt);
				}
			} 
			else {
				system.alert(this,"No Akru Lama tidak valid.","No Akru Lama harus terisi.");
			} 
		}catch(e){
			systemAPI.alert(e);
		}	
	},
	FindBtnClick: function(sender){
		if (sender == this.cbbNbLama) {   
			this.standarLib.showListData(this, "Daftar Bukti Akru",sender,undefined, 
										  "select no_bill, keterangan  from kop_pinjbill_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cbbPerLama.getText()+"' and no_del='-'", 
										  "select count(no_bill)       from kop_pinjbill_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cbbPerLama.getText()+"' and no_del='-'",
										  ["no_bill","keterangan"],"and",["No Akru","Deskripsi"],false);				
			this.standarLib.clearByTag(this, new Array("1"),undefined);		
			this.sg1.clear(1);
		}
		if (sender == this.cbbApp){
			this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
		if (sender == this.cbbAkun){
			this.standarLib.showListData(this, "Daftar Akun Pendapatan",sender,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag = '022'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag = '022'",
										  ["kode_akun","nama"],"and",["Kode Akun","Nama"],false);
		}
	},
	doDblClick: function(sender, col, row){
		if (this.sg2.getCell(0,row) != "") {
			var data = this.dbLib.getDataProvider("select a.no_kontrak,b.kode_agg,b.nama as nama_agg,date_format(g.tgl_angs,'%d/%m/%Y')as tanggal,a.keterangan,a.nilai,(a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0)) as baki, "+
												  "       a.lama_bayar,a.p_bunga,g.cicilan_ke, "+
												  "       case a.jenis_angs when 'F' then a.nilai_bunga else round((a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0))*a.p_bunga/12/100) end as nbunga, "+
												  "       case a.jenis_angs when 'F' then a.nilai_pokok else ((a.nilai_pokok+a.nilai_bunga) - round((a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0))*a.p_bunga/12/100)) end as npokok, "+
												  "       a.akun_pjasa,a.no_pinj "+
												  "from kop_pinj_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
												  "                  inner join kop_pinjbill_d c on c.no_kontrak=a.no_kontrak and c.no_pinj=a.no_pinj and a.kode_lokasi=c.kode_lokasi "+
												  "					 inner join kop_pinj_sch g on g.no_kontrak=a.no_kontrak and a.no_pinj=g.no_pinj and a.kode_lokasi=g.kode_lokasi and g.no_bill=c.no_bill "+
												  "                  left outer join (select x.no_kontrak,x.no_pinj,x.kode_lokasi,sum(case x.dc when 'D' then x.npokok+x.nbunga else -(x.npokok+x.nbunga) end) as nangs "+
												  "                                   from kop_pinjangs_d x "+
												  "                                   group by x.no_kontrak,x.no_pinj,x.kode_lokasi) aa "+
												  "                                   on aa.no_kontrak=a.no_kontrak and aa.no_pinj=a.no_pinj and aa.kode_lokasi=a.kode_lokasi  "+ 
												  "                  left outer join (select x.no_kontrak,x.no_pinj,x.kode_lokasi, sum(case x.dc when 'D' then x.nbunga else -x.nbunga end) as nbill "+
												  "                                   from kop_pinjbill_d x "+
												  "									  where x.no_bill <> '"+this.cbbNbLama.getText()+"' and x.kode_lokasi = '"+this.app._lokasi+"' "+
												  "                                   group by x.no_kontrak,x.no_pinj,x.kode_lokasi) bb "+
												  "                                   on bb.no_kontrak=a.no_kontrak and bb.no_pinj=a.no_pinj and bb.kode_lokasi=a.kode_lokasi "+
												  "where b.kode_loker = '"+this.sg2.getCell(0,row)+"' and a.akun_pjasa= '"+this.sg2.getCell(2,row)+"' and c.no_bill = '"+this.cbbNbLama.getText()+"' order by a.no_kontrak, g.cicilan_ke ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.no_kontrak,line.kode_agg,line.nama_agg,line.tanggal,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.lama_bayar),floatToNilai(line.p_bunga),floatToNilai(line.cicilan_ke),floatToNilai(line.npokok),floatToNilai(line.nbunga),floatToNilai(parseFloat(line.npokok)+parseFloat(line.nbunga)),line.akun_pjasa,line.no_pinj]);
				}
			}
		}
	},
	doSgChange: function(sender, col, row){
		if (sender == this.sg2) {
			var tot1 = tot2 = tot3 = 0;			
			for (var i = 0;i < this.sg2.getRowCount();i++){
				if ((this.sg2.cells(5,i) != "") && (this.sg2.cells(6,i) != "") && (this.sg2.cells(7,i) != "")) {
					tot1 += nilaiToFloat(this.sg2.cells(5,i));
					tot2 += nilaiToFloat(this.sg2.cells(6,i));
					tot3 += nilaiToFloat(this.sg2.cells(7,i));
				}
			}
			this.ePokok.setText(floatToNilai(tot1));
			this.eJasa.setText(floatToNilai(tot2));
			this.eTagihan.setText(floatToNilai(tot3));
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.nb+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
