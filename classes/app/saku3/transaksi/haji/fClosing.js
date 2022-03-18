window.app_saku3_transaksi_haji_fClosing = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_haji_fClosing.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_haji_fClosing";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Closing Registrasi (Jurnal): Input/Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Closing","Detail Registrasi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Akru","Tanggal","No Dokumen","Deskripsi","Total"],
					colWidth:[[4,3,2,1,0],[100,250,150,80,100]],
					colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,17,470,20],caption:"Deskripsi", maxLength:150});												
		this.e_debet = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,17,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[1],{bound:[20,11,100,18],caption:"Range Tanggal", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[1],{bound:[120,11,100,18]}); 
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[1],{bound:[250,11,100,18]}); 	
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,11,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this.pc2.childPage[1],{bound:[680,11,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[5,12,990,325], childPage:["Reg Lunas","Belum Lunas","Jurnal"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,285],colCount:13,tag:0,
		            colTitle:["PP/Cabang","No Registrasi","Peserta","Jadwal","Tanggal","Sisa Hari","Deskripsi","Curr","Netto","Saldo","Curr","Biaya +","Saldo +"],										
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,50,80,80,50,150,70,70,150,200,100,150]],readOnly:true,colFormat:[[5,8,9,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],									
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
						
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,285],colCount:13,tag:9,
		            colTitle:["PP/Cabang","No Registrasi","Peserta","Jadwal","Tanggal","Sisa Hari","Deskripsi","Curr","Netto","Saldo","Curr","Biaya +","Saldo +"],										
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,50,80,80,50,150,70,70,150,200,100,150]],readOnly:true,colFormat:[[5,8,9,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],									
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager2"]});		
		
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,285],colCount:8,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","DC","Nilai","No Reg","Jenis"],					
					colWidth:[[7,6,5,4,3,2,1,0],[80,150,80,60,150,80,230,80]],readOnly:true,colFormat:[[5],[cfNilai]],
					autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});		
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.dataJU = {rs:{rows:[]}};
			this.dataJU2 = {rs:{rows:[]}};
			this.dataJU1 = {rs:{rows:[]}};
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('HAJPPN','HUTPPN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "HAJPPN") this.pPPN = 100 + parseFloat(line.value1);
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_haji_fClosing.extend(window.childForm);
window.app_saku3_transaksi_haji_fClosing.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},	
	simpan: function(){			
		try{						
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from haj_akru_m where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from haj_akru_j where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from haj_akru_d where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update haj_reg set progress='0',no_akru='-' where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 										
					sql.add("insert into haj_akru_m (no_akru,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','HAJAKRU','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_debet.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F')");
																				
					for (var i=0;i < this.dataJU1.rs.rows.length;i++){
						var line1 = this.dataJU1.rs.rows[i];
						sql.add("insert into haj_akru_j(no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+line1.no_reg+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line1.kode_akun+"','"+this.e_ket.getText()+"','"+line1.dc.toUpperCase()+"',"+line1.nilai+",'"+line1.kode_pp+"','-','"+this.app._lokasi+"','HAJAKRU','"+line1.jenis.toUpperCase()+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}						
					
					sql.add("insert into haj_akru_d(no_akru,kode_lokasi,periode,no_reg,nilai,dc) "+
							"select no_akru,kode_lokasi,periode,no_dokumen,sum(nilai) as nilai,dc from haj_akru_j "+
							"where no_akru='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and dc = 'D' "+
							"group by no_akru,kode_lokasi,periode,no_dokumen,dc");
					
					sql.add("update a set a.progress='1',a.no_akru='"+this.e_nb.getText()+"' "+
					        "from haj_reg a inner join haj_akru_d b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_akru='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");					
					
					setTipeButton(tbAllFalse);					
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
												
				if (nilaiToFloat(this.e_debet.getText()) <=0 || nilaiToFloat(this.e_kredit.getText()) <=0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit harus lebih besar dari nol.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit harus balance.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
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
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from haj_akru_m where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from haj_akru_j where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from haj_akru_d where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update haj_reg set progress='0',no_akru='-' where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		this.doLoad3();
	},
	doLoadData:function(sender){		
		if (this.e_periode.getText()!="") {			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			
			var strSQL = "select g.kode_pp+' - '+g.nama as nama_pp,d.no_reg,f.no_peserta+' - '+f.nama as nama_peserta,a.nama as jadwal,convert(varchar,a.tanggal,103) as tgl,datediff(day,getdate(),a.tanggal) as due_date,b.nama+' - '+c.nama as nama, a.kode_curr, a.harga-a.diskon as neto, round(a.harga-a.diskon-isnull(e.bayar,0),2) as saldo, "+
						"  'IDR' as curr_tambah,ISNULL(h.biaya,0) as tambahan, ISNULL(h.biaya,0)-ISNULL(i.bayar_biaya,0) as saldo_tambah,a.no_jadwal,g.kode_pp "+
						"	from haj_jadwal a  "+
						"	inner join haj_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi  "+
						"	inner join haj_produk c on b.kode_produk=c.kode_produk and b.kode_lokasi=c.kode_lokasi  "+
						"	inner join haj_reg d on a.no_jadwal=d.no_jadwal and a.kode_lokasi=d.kode_lokasi  "+
						"	inner join haj_peserta f on d.no_peserta=f.no_peserta and d.kode_lokasi=f.kode_lokasi "+
						"	inner join pp g on d.kode_pp=g.kode_pp and d.kode_lokasi=g.kode_lokasi "+
						"	left join (select no_reg,kode_lokasi,sum(nilai_kas+nilai_lain) as bayar "+
						"			   from haj_titipbayar_d where kode_lokasi='"+this.app._lokasi+"' "+
						"			   group by no_reg,kode_lokasi) e on d.no_reg=e.no_reg and d.kode_lokasi=e.kode_lokasi "+
						"	left join (select no_reg,kode_lokasi,sum(nilai) as biaya "+
						"			   from haj_reg_d where kode_lokasi='"+this.app._lokasi+"' "+
						"			   group by no_reg,kode_lokasi) h on d.no_reg=h.no_reg and d.kode_lokasi=h.kode_lokasi "+
						"	left join (select no_reg,kode_lokasi,sum(nilai) as bayar_biaya "+
						"			   from haj_titipbayar_tambah where kode_lokasi='"+this.app._lokasi+"' "+
						"			   group by no_reg,kode_lokasi) i on d.no_reg=i.no_reg and d.kode_lokasi=i.kode_lokasi "+
						"	where (round(a.harga-a.diskon-isnull(e.bayar,0),2) + (ISNULL(h.biaya,0)-ISNULL(i.bayar_biaya,0)) = 0) and "+
						"          a.kode_lokasi='"+this.app._lokasi+"' and d.progress='0' and a.tanggal between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' "+
						"  order by a.no_jadwal,g.kode_pp";
												
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				this.dataJU = data1;
				this.sgn.setTotalPage(Math.ceil(data1.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);								
			
			var data2 = this.dbLib.getDataProvider("select g.kode_pp+' - '+g.nama as nama_pp,d.no_reg,f.no_peserta+' - '+f.nama as nama_peserta,a.nama as jadwal,convert(varchar,a.tanggal,103) as tgl,datediff(day,getdate(),a.tanggal) as due_date,b.nama+' - '+c.nama as nama, a.kode_curr, a.harga-a.diskon as neto, round(a.harga-a.diskon-isnull(e.bayar,0),2) as saldo, "+
												"  'IDR' as curr_tambah,ISNULL(h.biaya,0) as tambahan, ISNULL(h.biaya,0)-ISNULL(i.bayar_biaya,0) as saldo_tambah,a.no_jadwal,g.kode_pp "+
												"	from haj_jadwal a  "+
												"	inner join haj_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi  "+
												"	inner join haj_produk c on b.kode_produk=c.kode_produk and b.kode_lokasi=c.kode_lokasi  "+
												"	inner join haj_reg d on a.no_jadwal=d.no_jadwal and a.kode_lokasi=d.kode_lokasi  "+
												"	inner join haj_peserta f on d.no_peserta=f.no_peserta and d.kode_lokasi=f.kode_lokasi "+
												"	inner join pp g on d.kode_pp=g.kode_pp and d.kode_lokasi=g.kode_lokasi "+
												"	left join (select no_reg,kode_lokasi,sum(nilai_kas+nilai_lain) as bayar "+
												"			   from haj_titipbayar_d where kode_lokasi='"+this.app._lokasi+"' "+
												"			   group by no_reg,kode_lokasi) e on d.no_reg=e.no_reg and d.kode_lokasi=e.kode_lokasi "+
												"	left join (select no_reg,kode_lokasi,sum(nilai) as biaya "+
												"			   from haj_reg_d where kode_lokasi='"+this.app._lokasi+"' "+
												"			   group by no_reg,kode_lokasi) h on d.no_reg=h.no_reg and d.kode_lokasi=h.kode_lokasi "+
												"	left join (select no_reg,kode_lokasi,sum(nilai) as bayar_biaya "+
												"			   from haj_titipbayar_tambah where kode_lokasi='"+this.app._lokasi+"' "+
												"			   group by no_reg,kode_lokasi) i on d.no_reg=i.no_reg and d.kode_lokasi=i.kode_lokasi "+
												"	where (round(a.harga-a.diskon-isnull(e.bayar,0),2) + (ISNULL(h.biaya,0)-ISNULL(i.bayar_biaya,0)) <> 0) and "+
												"          a.kode_lokasi='"+this.app._lokasi+"' and d.progress='0' and a.tanggal between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' "+
												"  order by a.no_jadwal,g.kode_pp",true);				
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				this.dataJU2 = data2;
				this.sgn2.setTotalPage(Math.ceil(data2.rs.rows.length/20));
				this.sgn2.rearrange();
				this.doTampilData2(1);
			} else this.sg2.clear(1);											
			
			var noReg = "";
			for (var i=0;i < this.dataJU.rs.rows.length;i++){				
				var line1 = this.dataJU.rs.rows[i];
				noReg += ",'"+line1.no_reg+"'";				
			}
			noReg = noReg.substr(1);
			if (noReg == "") noReg = "''";
			
			var strSQL = "select e.kode_akun,f.nama as nama_akun,a.kode_pp,g.nama as nama_pp,'D' as dc,sum(e.nilai) as nilai,a.no_reg,e.jenis "+
						 "from haj_reg a "+
						 "inner join haj_jadwal b on a.no_jadwal=b.no_jadwal and a.kode_lokasi=b.kode_lokasi "+
						 "inner join haj_kelas c on b.kode_kelas=c.kode_kelas and c.kode_lokasi=b.kode_lokasi "+
						 "inner join haj_produk d on c.kode_produk=d.kode_produk and c.kode_lokasi=d.kode_lokasi "+
						 "inner join kas_j e on a.no_reg=e.no_dokumen and a.kode_lokasi=e.kode_lokasi and e.jenis in ('TITIP','TAMBAH') "+
						 "inner join masakun f on e.kode_akun=f.kode_akun and e.kode_lokasi=f.kode_lokasi "+
						 "inner join pp g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_reg in ("+noReg+") "+
						 "group by a.no_reg,e.kode_akun,e.jenis,f.nama,a.kode_pp,g.nama "+
						 "union all "+
						 "select d.akun_pdpt,f.nama as nama_akun,a.kode_pp,g.nama as nama_pp,'C' as dc,round(sum(case when e.jenis='TITIP' then (100 * e.nilai / "+this.pPPN+") else e.nilai end),0) as nilai,a.no_reg,'P-'+e.jenis as jenis "+
						 "from haj_reg a "+
						 "inner join haj_jadwal b on a.no_jadwal=b.no_jadwal and a.kode_lokasi=b.kode_lokasi "+
						 "inner join haj_kelas c on b.kode_kelas=c.kode_kelas and c.kode_lokasi=b.kode_lokasi "+
						 "inner join haj_produk d on c.kode_produk=d.kode_produk and c.kode_lokasi=d.kode_lokasi "+
						 "inner join kas_j e on a.no_reg=e.no_dokumen and a.kode_lokasi=e.kode_lokasi and e.jenis in ('TITIP','TAMBAH') "+
						 "inner join masakun f on d.akun_pdpt=f.kode_akun and d.kode_lokasi=f.kode_lokasi "+
						 "inner join pp g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_reg in ("+noReg+") "+
						 "group by a.no_reg,d.akun_pdpt,e.jenis,f.nama,a.kode_pp,g.nama "+
						 "union all "+
						 "select '"+this.akunPPN+"',f.nama as nama_akun,a.kode_pp,g.nama as nama_pp,'C' as dc,sum(e.nilai) - round(sum(100 * e.nilai / "+this.pPPN+"),0) as nilai,a.no_reg,'PPN' as jenis "+
						 "from haj_reg a "+
						 "inner join haj_jadwal b on a.no_jadwal=b.no_jadwal and a.kode_lokasi=b.kode_lokasi "+
						 "inner join haj_kelas c on b.kode_kelas=c.kode_kelas and c.kode_lokasi=b.kode_lokasi "+
						 "inner join haj_produk d on c.kode_produk=d.kode_produk and c.kode_lokasi=d.kode_lokasi "+
						 "inner join kas_j e on a.no_reg=e.no_dokumen and a.kode_lokasi=e.kode_lokasi and e.jenis in ('TITIP') "+
						 "inner join masakun f on '"+this.akunPPN+"'=f.kode_akun and d.kode_lokasi=f.kode_lokasi "+
						 "inner join pp g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_reg in ("+noReg+") "+
						 "group by a.no_reg,e.jenis,f.nama,a.kode_pp,g.nama "+
						 "order by a.kode_pp,a.no_reg,dc desc";			
			
			var data1 = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				this.dataJU1 = data1;
				this.sgn1.setTotalPage(Math.ceil(data1.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData1(1);
			} else this.sg1.clear(1);											
			
			var totalD = totalC = 0;
			for (var i=0;i < this.dataJU1.rs.rows.length;i++){
				var line1 = this.dataJU1.rs.rows[i];
				if (line1.dc.toUpperCase() == "D") totalD += parseFloat(line1.nilai);
				else totalC += parseFloat(line1.nilai);										
			}						
			this.e_debet.setText(floatToNilai(totalD));
			this.e_kredit.setText(floatToNilai(totalC));												
		}		
	},	
	doTampilData: function(page) {
		this.sg.clear();
		var line1;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line1 = this.dataJU.rs.rows[i];													
			this.sg.appendData([line1.nama_pp,line1.no_reg,line1.nama_peserta,line1.jadwal,line1.tgl,floatToNilai(line1.due_date),line1.nama,line1.kode_curr,floatToNilai(line1.neto),floatToNilai(line1.saldo),line1.curr_tambah.toUpperCase(),floatToNilai(line1.tambahan),floatToNilai(line1.saldo_tambah)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doTampilData2: function(page) {
		this.sg2.clear();
		var line2;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU2.rs.rows.length? this.dataJU2.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line2 = this.dataJU2.rs.rows[i];													
			this.sg2.appendData([line2.nama_pp,line2.no_reg,line2.nama_peserta,line2.jadwal,line2.tgl,floatToNilai(line2.due_date),line2.nama,line2.kode_curr,floatToNilai(line2.neto),floatToNilai(line2.saldo),line2.curr_tambah.toUpperCase(),floatToNilai(line2.tambahan),floatToNilai(line2.saldo_tambah)]);
		}
		this.sg2.setNoUrut(start);
	},
	doPager2: function(sender, page) {
		this.doTampilData2(page);
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg1.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.dc.toUpperCase(),floatToNilai(line.nilai),line.no_reg,line.jenis.toUpperCase()]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},	
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.standarLib.clearByTag(this, new Array("3"),this.e_nb);
				this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1);				
				this.e_debet.setText("0"); this.e_kredit.setText("0");
				this.bTampil.setVisible(true);
				this.dataJU = {rs:{rows:[]}};
				this.dataJU2 = {rs:{rows:[]}};
				this.dataJU1 = {rs:{rows:[]}};
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"haj_akru_m","no_akru",this.app._lokasi+"-AK"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}			
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_kopeg_sju_rptKbJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;								
								this.pc2.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;										
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :				
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","3"),this.e_nb);
			this.sg1.clear(1); this.sg.clear(1); this.sg2.clear(1); 
			setTipeButton(tbAllFalse);		
			this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.dataJU = {rs:{rows:[]}};
			this.dataJU2 = {rs:{rows:[]}};
			this.dataJU1 = {rs:{rows:[]}};
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																							
		var strSQL = "select a.no_akru,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai,a.tanggal "+
		             "from haj_akru_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' "+
					 "order by a.tanggal";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_akru,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {		
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.bTampil.setVisible(false);
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan "+
							 "from haj_akru_m "+
							 "where no_akru = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_ket.setText(line.keterangan);															
					}
				}				
				
				var data1 = this.dbLib.getDataProvider("select g.kode_pp+' - '+g.nama as nama_pp,d.no_reg,f.no_peserta+' - '+f.nama as nama_peserta,a.nama as jadwal,convert(varchar,a.tanggal,103) as tgl,datediff(day,getdate(),a.tanggal) as due_date,b.nama+' - '+c.nama as nama, a.kode_curr, a.harga-a.diskon as neto, round(a.harga-a.diskon-isnull(e.bayar,0),2) as saldo, "+
													"  'IDR' as curr_tambah,ISNULL(h.biaya,0) as tambahan, ISNULL(h.biaya,0)-ISNULL(i.bayar_biaya,0) as saldo_tambah,a.no_jadwal,g.kode_pp "+
													"	from haj_jadwal a  "+
													"	inner join haj_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi  "+
													"	inner join haj_produk c on b.kode_produk=c.kode_produk and b.kode_lokasi=c.kode_lokasi  "+
													"	inner join haj_reg d on a.no_jadwal=d.no_jadwal and a.kode_lokasi=d.kode_lokasi  "+
													"	inner join haj_peserta f on d.no_peserta=f.no_peserta and d.kode_lokasi=f.kode_lokasi "+
													"	inner join pp g on d.kode_pp=g.kode_pp and d.kode_lokasi=g.kode_lokasi "+
													"	inner join haj_akru_d j on d.no_reg=j.no_reg and d.kode_lokasi=j.kode_lokasi "+
													"	left join (select no_reg,kode_lokasi,sum(nilai_kas+nilai_lain) as bayar "+
													"			   from haj_titipbayar_d where kode_lokasi='"+this.app._lokasi+"' "+
													"			   group by no_reg,kode_lokasi) e on d.no_reg=e.no_reg and d.kode_lokasi=e.kode_lokasi "+
													"	left join (select no_reg,kode_lokasi,sum(nilai) as biaya "+
													"			   from haj_reg_d where kode_lokasi='"+this.app._lokasi+"' "+
													"			   group by no_reg,kode_lokasi) h on d.no_reg=h.no_reg and d.kode_lokasi=h.kode_lokasi "+
													"	left join (select no_reg,kode_lokasi,sum(nilai) as bayar_biaya "+
													"			   from haj_titipbayar_tambah where kode_lokasi='"+this.app._lokasi+"' "+
													"			   group by no_reg,kode_lokasi) i on d.no_reg=i.no_reg and d.kode_lokasi=i.kode_lokasi "+
													"	where j.no_akru='"+this.e_nb.getText()+"' and j.kode_lokasi='"+this.app._lokasi+"' "+
													"  order by a.no_jadwal,g.kode_pp",true);	
				
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					this.dataJU = data1;
					this.sgn.setTotalPage(Math.ceil(data1.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
								
				var data1 = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.dc,a.nilai,a.no_dokumen as no_reg,a.jenis "+
				           "from haj_akru_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						   "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=b.kode_lokasi "+
				           "where a.no_akru='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					this.dataJU1 = data1;
					this.sgn1.setTotalPage(Math.ceil(data1.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData1(1);
				} else this.sg1.clear(1);															
				
				var totalD = totalC = 0;
				for (var i=0;i < this.dataJU1.rs.rows.length;i++){
					var line1 = this.dataJU1.rs.rows[i];
					if (line1.dc.toUpperCase() == "D") totalD += parseFloat(line1.nilai);
					else totalC += parseFloat(line1.nilai);										
				}						
				this.e_debet.setText(floatToNilai(totalD));
				this.e_kredit.setText(floatToNilai(totalC));				
			}						
		} catch(e) {alert(e);}		
	}
});
