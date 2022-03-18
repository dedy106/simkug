window.app_kopeg_pinjbrg_transaksi_fBilling = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjbrg_transaksi_fBilling.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjbrg_transaksi_fBilling";						
			this.maximize();
			owner.childFormConfig(this, "mainButtonClick","Form Akrual Jasa Kredit Barang : Input", 0);			
			//------------------------ login data ------------------------	
			uses("portalui_saiCBB;portalui_datePicker;portalui_radioButton");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,20,200,20],caption:"Periode",readOnly:true,tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18],selectDate:[this,"doSelectDate"]});
			this.eBukti = new portalui_saiLabelEdit(this,{bound:[20,23,290,20],caption:"No Akru",readOnly:true});
			this.bGen = new portalui_button(this,{bound:[320,23,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,24,290,20],caption:"No Dok. Ref"});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,26,500,20],caption:"Keterangan"});
			this.ePokok = new portalui_saiLabelEdit(this,{bound:[720,26,200,20],caption:"Total Pokok", tipeText:ttNilai, text:"0", readOnly: true});			
			this.cbbApp = new portalui_saiCBBL(this,{bound:[20,28,200,20],caption:"NIK Approval", btnClick:[this,"FindBtnClick"],tag:2});			
			this.eJasa = new portalui_saiLabelEdit(this,{bound:[720,28,200,20],caption:"Total Jasa", tipeText:ttNilai, text:"0",readOnly: true});			
			this.cbbAkun = new portalui_saiCBBL(this,{bound:[20,29,200,20],caption:"Akun Pdpt Jasa", btnClick:[this,"FindBtnClick"],tag:2});			
			this.eTagihan = new portalui_saiLabelEdit(this,{bound:[720,29,200,20],caption:"Total Tagihan", tipeText:ttNilai, text:"0",readOnly: true});			
			this.bTampil = new portalui_button(this,{bound:[620,29,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});
			
			this.p2 = new portalui_panel(this,{bound:[20,35,900,200],caption:"Daftar Jurnal Akru Jasa Kredit"});
			this.sg2 = new portalui_saiGrid(this.p2,{bound:[1,20,898,175],colCount:8,
			    colWidth:[[0,1,2,3,4,5,6,7],[80,120,80,180,100,100,100,100]],
				colTitle:["Kode Loker","Nama Loker","Akun ARJasa","Nama Akun","Total Kredit","Total Pokok","Total Jasa","Total Tagihan"],
                colFormat:[[4,5,6,7],[cfNilai, cfNilai, cfNilai, cfNilai]],dblClick:[this,"doDblClick"],
                readOnly:true, defaultRow:1,nilaiChange:[this,"doSgChange"]}); 
				
			this.p1 = new portalui_panel(this,{bound:[20,36,900,280],caption:"Daftar Jasa Kredit untuk diAkru"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,260],colCount:13,
			    colWidth:[[0,1,2,3,4,5,6,7,8,9, 10,11,12],[80,0,140,60,120,80,50,50,50,80,  80,80,0,0]],
				colTitle:["No Kontrak","Kd Nsbh","Nama Nasabah","Tanggal","Keterangan","Nilai Kredit.","Jk Waktu","Persen","Cicil Ke","Nilai Pokok",
				          "Nilai Jasa","Nilai Tagihan","Akun Piu.Jasa","No Kredit"],
                colFormat:[[5,6,7,8,9,10,11],[cfNilai, cfNilai, cfNilai, cfNilai ,cfNilai ,cfNilai ,cfNilai]],
                readOnly:true, colHide:[[1,12,13],true], defaultRow:1,nilaiChange:[this,"doSgChange"],tag:9}); 
			this.rearrangeChild(10,22);
			setTipeButton(tbSimpan);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());
			this.cbbApp.setSQL("select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",["nik","nama"],true);
			this.cbbAkun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag = '022'",["a.kode_akun","a.nama"],true);

		}catch(e){
			systemAPI.alert("[app_kopeg_pinjbrg_transaksi_fBilling]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjbrg_transaksi_fBilling.extend(window.portalui_childForm);
window.app_kopeg_pinjbrg_transaksi_fBilling.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pbrgbill_m","no_bill",this.app._lokasi+"-BP"+this.ePeriode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kop_pbrgbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link,no_ref,akun_pdpt) values  "+
							"('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.eKet.getText()+"','"+this.dTgl.getDateString()+"',"+parseNilai(this.eTagihan.getText())+",'"+this.ePeriode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cbbApp.getText()+"','"+this.app._userLog+"',now(),'F','IDR',1,'-','-','-','"+this.cbbAkun.getText()+"')");
					var scr1 = "insert into kop_pbrgbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						       "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var baris1 = true;
					var line = undefined;
					var idx = 0;
					for (var i=0; i<this.sg2.rows.getLength(); i++){
						if (!baris1) { scr1 += ",";}	
						scr1 += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.sg2.getCell(2,i)+
							 	"','"+this.eKet.getText()+"','D',"+parseNilai(this.sg2.getCell(6,i))+",'"+this.app._kodePP+"','-',"+
								"'"+this.app._lokasi+"','PBRGBILL','ARJS','"+this.ePeriode.getText()+
								"','IDR',1,'"+this.app._userLog+"',now())";
						baris1 = false;
						idx++;
					}					
					scr1 += ",";
					scr1 += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.cbbAkun.getText()+
							"','"+this.eKet.getText()+"','C',"+parseNilai(this.eJasa.getText())+",'"+this.app._kodePP+"','-',"+
							"'"+this.app._lokasi+"','PBRGBILL','PDPT','"+this.ePeriode.getText()+
							"','IDR',1,'"+this.app._userLog+"',now())";
					sql.add(scr1);
												  
					sql.add("insert into kop_pbrgbill_d(no_bill,no_pbrg,no_kontrak,kode_lokasi,cicilan_ke,npokok,nbunga,akun_pjasa,akun_pdpt,dc,no_del) "+
							"select '"+this.eBukti.getText()+"',a.no_pbrg,a.no_kontrak,a.kode_lokasi,g.cicilan_ke, "+
							"       case a.jenis_angs when 'F' then a.nilai_pokok else ((a.nilai_pokok+a.nilai_bunga) - round((a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0))*a.p_bunga/12/100)) end as npokok, "+
							"       case a.jenis_angs when 'F' then a.nilai_bunga else round((a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0))*a.p_bunga/12/100) end as nbunga, "+
							"       a.akun_pjasa,'"+this.cbbAkun.getText()+"','D','-' "+							
							"from kop_pbrg_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
						    "				   inner join kop_pbrg_sch g on g.no_kontrak=a.no_kontrak and a.no_pbrg=g.no_pbrg and a.kode_lokasi=g.kode_lokasi "+
						    "                  inner join kop_loker m on b.kode_loker=m.kode_loker and b.kode_lokasi=m.kode_lokasi "+
						    "                  inner join masakun n on a.akun_pjasa=n.kode_akun and a.kode_lokasi=n.kode_lokasi "+
						    "                  left outer join (select x.no_kontrak,x.no_pbrg,x.kode_lokasi,sum(case x.dc when 'D' then x.npokok+x.nbunga else -(x.npokok+x.nbunga) end) as nangs "+
						    "                                   from kop_pbrgangs_d x                             "+
						    "                                   group by x.no_kontrak,x.no_pbrg,x.kode_lokasi) aa "+
						    "                                   on aa.no_kontrak=a.no_kontrak and aa.no_pbrg=a.no_pbrg and aa.kode_lokasi=a.kode_lokasi  "+ 
						    "                  left outer join (select x.no_kontrak,x.no_pbrg,x.kode_lokasi, sum(case x.dc when 'D' then x.nbunga else -x.nbunga end) as nbill "+
						    "                                   from kop_pbrgbill_d x                       "+
						    "                                   group by x.no_kontrak,x.no_pbrg,x.kode_lokasi) bb "+
						    "                                   on bb.no_kontrak=a.no_kontrak and bb.no_pbrg=a.no_pbrg and bb.kode_lokasi=a.kode_lokasi "+											      
						    "where a.progress='2' and a.status_aktif='1' and g.status_gen='0' and "+
						    "      (a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0)) > 0 and a.kode_lokasi = '"+this.app._lokasi+"' and g.tgl_angs between '"+this.ePeriode.getText().substr(0,4)+'-'+this.ePeriode.getText().substr(4,2)+'-01'+"' and '"+this.ePeriode.getText().substr(0,4)+'-'+this.ePeriode.getText().substr(4,2)+'-31'+"' ");							
					
					sql.add("update kop_pbrg_sch a, kop_pbrgbill_d b set a.status_gen='1', a.no_bill='"+this.eBukti.getText()+
					        "' where a.no_pbrg=b.no_pbrg and a.no_kontrak=b.no_kontrak and a.cicilan_ke=b.cicilan_ke and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi='"+this.app._lokasi+"' and b.no_bill='"+this.eBukti.getText()+"'");					
					
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
					this.sg2.clear(1); this.sg1.clear(1);
				}
				break;
			case "simpan" :	
				if (nilaiToFloat(this.eTagihan.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Total Tagihan tidak boleh kurang dari atau sama dengan nol.");
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
		}
	},
	doSelectDate: function(sender, y, m, d){
       this.ePeriode.setText(sender.getThnBln());
    },
	doClick: function(sender){
		if (sender == this.bGen){
			this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pbrgbill_m","no_bill",this.app._lokasi+"-BP"+this.ePeriode.getText().substr(2,4)+".","0000"));
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
			if (this.ePeriode.getText() != ""){
			    this.sg1.clear(1);
				var data = this.dbLib.getDataProvider("select m.kode_loker,m.nama as nama_loker,a.akun_pjasa,n.nama as nama_akun,sum(a.nilai) as totnilai,"+
													  "       sum(case a.jenis_angs when 'F' then a.nilai_bunga else round((a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0))*a.p_bunga/12/100) end) as totbunga, "+
													  "       sum(case a.jenis_angs when 'F' then a.nilai_pokok else ((a.nilai_pokok+a.nilai_bunga) - round((a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0))*a.p_bunga/12/100)) end) as totpokok "+
													  "from kop_pbrg_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
													  "					 inner join kop_pbrg_sch g on g.no_kontrak=a.no_kontrak and a.no_pbrg=g.no_pbrg and a.kode_lokasi=g.kode_lokasi "+
													  "                  inner join kop_loker m on b.kode_loker=m.kode_loker and b.kode_lokasi=m.kode_lokasi "+
													  "                  inner join masakun n on a.akun_pjasa=n.kode_akun and a.kode_lokasi=n.kode_lokasi "+
													  "                  left outer join (select x.no_kontrak,x.no_pbrg,x.kode_lokasi,sum(case x.dc when 'D' then x.npokok+x.nbunga else -(x.npokok+x.nbunga) end) as nangs "+
													  "                                   from kop_pbrgangs_d x                             "+
													  "                                   group by x.no_kontrak,x.no_pbrg,x.kode_lokasi) aa "+
													  "                                   on aa.no_kontrak=a.no_kontrak and aa.no_pbrg=a.no_pbrg and aa.kode_lokasi=a.kode_lokasi  "+ 
													  "                  left outer join (select x.no_kontrak,x.no_pbrg,x.kode_lokasi, sum(case x.dc when 'D' then x.nbunga else -x.nbunga end) as nbill "+
													  "                                   from kop_pbrgbill_d x                       "+
													  "                                   group by x.no_kontrak,x.no_pbrg,x.kode_lokasi) bb "+
													  "                                   on bb.no_kontrak=a.no_kontrak and bb.no_pbrg=a.no_pbrg and bb.kode_lokasi=a.kode_lokasi "+
													  "where a.progress='2' and a.status_aktif='1' and g.status_gen='0' and (a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0)) > 0 and "+
													  "      a.kode_lokasi = '"+this.app._lokasi+"' and g.tgl_angs between '"+this.ePeriode.getText().substr(0,4)+'-'+this.ePeriode.getText().substr(4,2)+'-01'+"' and '"+this.ePeriode.getText().substr(0,4)+'-'+this.ePeriode.getText().substr(4,2)+'-31'+
													  "' group by m.kode_loker,a.akun_pjasa order by m.kode_loker,n.kode_akun");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_loker,line.nama_loker,line.akun_pjasa,line.nama_akun,floatToNilai(line.totnilai),floatToNilai(line.totpokok),floatToNilai(line.totbunga),floatToNilai(parseFloat(line.totpokok)+parseFloat(line.totbunga))]);
					}
					this.sg2.validasi();
				}
			}
			else {
				system.alert(this,"Periode tidak valid.","Periode harus terisi.");
			}
		}catch(e){
			systemAPI.alert(e);
		}	
	},
	doDblClick: function(sender, col, row){
		if (this.sg2.getCell(0,row) != "") {												  
			var data = this.dbLib.getDataProvider("select a.no_kontrak,b.kode_agg,b.nama as nama_agg,date_format(g.tgl_angs,'%d/%m/%Y')as tanggal,a.keterangan,a.nilai,(a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0)) as baki,"+
												  "       a.lama_bayar,a.p_bunga,g.cicilan_ke, "+
												  "       case a.jenis_angs when 'F' then a.nilai_bunga else round((a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0))*a.p_bunga/12/100) end as nbunga, "+
												  "       case a.jenis_angs when 'F' then a.nilai_pokok else ((a.nilai_pokok+a.nilai_bunga) - round((a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0))*a.p_bunga/12/100)) end as npokok, "+												  
												  "       a.akun_pjasa,a.no_pbrg "+
												  "from kop_pbrg_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
												  "					 inner join kop_pbrg_sch g on g.no_kontrak=a.no_kontrak and a.no_pbrg=g.no_pbrg and a.kode_lokasi=g.kode_lokasi "+
												  "                  inner join kop_loker m on b.kode_loker=m.kode_loker and b.kode_lokasi=m.kode_lokasi "+
												  "                  inner join masakun n on a.akun_pjasa=n.kode_akun and a.kode_lokasi=n.kode_lokasi "+
												  "                  left outer join (select x.no_kontrak,x.no_pbrg,x.kode_lokasi,sum(case x.dc when 'D' then x.npokok+x.nbunga else -(x.npokok+x.nbunga) end) as nangs "+
												  "                                   from kop_pbrgangs_d x                             "+
												  "                                   group by x.no_kontrak,x.no_pbrg,x.kode_lokasi) aa "+
												  "                                   on aa.no_kontrak=a.no_kontrak and aa.no_pbrg=a.no_pbrg and aa.kode_lokasi=a.kode_lokasi  "+ 
												  "                  left outer join (select x.no_kontrak,x.no_pbrg,x.kode_lokasi, sum(case x.dc when 'D' then x.nbunga else -x.nbunga end) as nbill "+
												  "                                   from kop_pbrgbill_d x                       "+
												  "                                   group by x.no_kontrak,x.no_pbrg,x.kode_lokasi) bb "+
												  "                                   on bb.no_kontrak=a.no_kontrak and bb.no_pbrg=a.no_pbrg and bb.kode_lokasi=a.kode_lokasi "+											      
												  "where a.progress='2' and b.kode_loker='"+this.sg2.getCell(0,row)+"' and a.akun_pjasa='"+this.sg2.getCell(2,row)+"' and a.status_aktif='1' and g.status_gen='0' and "+
												  "      a.kode_lokasi = '"+this.app._lokasi+"' and (a.nilai+ifnull(bb.nbill,0)-ifnull(aa.nangs,0)) > 0 and g.tgl_angs between '"+this.ePeriode.getText().substr(0,4)+'-'+this.ePeriode.getText().substr(4,2)+'-01'+"' and '"+this.ePeriode.getText().substr(0,4)+'-'+this.ePeriode.getText().substr(4,2)+'-31'+"' order by a.no_kontrak, g.cicilan_ke ");
												  
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.no_kontrak,line.kode_agg,line.nama_agg,line.tanggal,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.lama_bayar),floatToNilai(line.p_bunga),floatToNilai(line.cicilan_ke),floatToNilai(line.npokok),floatToNilai(line.nbunga),floatToNilai(parseFloat(line.npokok)+parseFloat(line.nbunga)),line.akun_pjasa,line.no_pbrg]);
				}
				this.sg1.validasi();
			}	
		}
	},
	FindBtnClick: function(sender){
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.eBukti.getText()+")");							
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
