window.app_saku3_transaksi_travel_prod_fHitungFee = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_prod_fHitungFee.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_prod_fHitungFee";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hitung Komisi Agen", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Total"],
					colWidth:[[3,2,1,0],[100,250,80,100]],
					colFormat:[[3],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,470,20],caption:"Deskripsi", maxLength:150});												
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total Komisi", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.c_curr = new saiCB(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Currency",items:["IDR","USD"], tag:2, change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[290,16,200,22],caption:"Kurs", tag:2, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_totalIDR = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Total IDR", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,13,990,327], childPage:["Daftar Komisi","Detail"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
		            colTitle:["Kode Agen","Nama Agen","Jml Jamaah","Tot Paket+Room","Total Komisi","Tot Komisi IDR","Detail"],										
					colWidth:[[6,5,4,3,2,1,0],[70,120,120,120,100,300,80]],					
					readOnly:true,
					colFormat:[[2,3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai,cfButton]],	
					dblClick:[this,"doDoubleClick"],
					click:[this,"doSgBtnClick"], colAlign:[[6],[alCenter]],													 							
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:10,tag:0,
		            colTitle:["Agen","No Reg","Paket","Jadwal","Peserta","Paket","Harga Paket","Harga Room","Nilai Bayar","Komisi"],										
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,200,100,150,100,150]],					
					readOnly:true,
					colFormat:[[6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai]],									
					autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});		
						
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
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
			this.c_curr.setText("");

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.dataJU = {rs:{rows:[]}};	
			this.dataJU1 = {rs:{rows:[]}};
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('KOMISI','BYMHD') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "KOMISI") this.akunKomisi = line.flag;
					if (line.kode_spro == "BYMHD") this.akunBymhd = line.flag;
				}
			}	
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_prod_fHitungFee.extend(window.childForm);
window.app_saku3_transaksi_travel_prod_fHitungFee.implement({
	doDoubleClick: function(sender, col , row) {
		try{
			var strSQL = "select a.no_agen+' | '+f.nama_agen as agen,a.no_reg,a.no_paket+' | '+b.nama as paket,c.tgl_berangkat,a.kode_harga+' | '+g.nama as harga,a.no_peserta+' | '+h.nama as jamaah,a.harga as harga_paket,a.harga_room as room,isnull(e.bayar,0) as bayar,d.fee "+
					"from dgw_reg a "+
					"inner join dgw_paket b on a.no_paket=b.no_paket and a.kode_lokasi=b.kode_lokasi "+
					"inner join dgw_jadwal c on a.no_paket=c.no_paket and a.no_jadwal=c.no_jadwal and a.kode_lokasi=b.kode_lokasi "+
					"inner join dgw_harga d on a.kode_harga=d.kode_harga and  a.no_paket = d.no_paket and a.kode_lokasi=d.kode_lokasi and d.curr_fee='"+this.c_curr.getText()+"' "+
					"inner join dgw_agent f on a.no_agen=f.no_agen and a.kode_lokasi=f.kode_lokasi and substring(f.flag_aktif,1,1) ='1' "+
					"inner join dgw_jenis_harga g on a.kode_harga=g.kode_harga and a.kode_lokasi=g.kode_lokasi "+
					"inner join dgw_peserta h on a.no_peserta=h.no_peserta and a.kode_lokasi=h.kode_lokasi "+
					"left join ( "+
					"		select no_reg,kode_lokasi,sum(nilai_p) as bayar from dgw_pembayaran "+
					"		where kode_lokasi='"+this.app._lokasi+"' "+
					"		group by no_reg,kode_lokasi "+
					") e on a.no_reg=e.no_reg and a.kode_lokasi=e.kode_lokasi "+
					"where a.no_agen='"+sender.cells(0,row)+"' and a.no_fee='-' and a.kode_lokasi ='"+this.app._lokasi+"' and isnull(e.bayar,0) >= b.tarif_agen "+
					"order by a.no_agen,a.no_paket,c.tgl_berangkat";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line1;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line1 = data.rs.rows[i];							
					this.sg1.appendData([line1.agen,line1.no_reg,line1.paket,line1.tgl_berangkat,line1.jamaah,line1.harga,floatToNilai(line1.harga_paket),floatToNilai(line1.room),floatToNilai(line1.bayar),floatToNilai(line1.fee)]);		
				}
			} else this.sg1.clear(1);	

			this.pc1.setActivePage(this.pc1.childPage[1]);																		
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col == 6) this.doDoubleClick(this.sg,0,row); 				
		}catch(e){
			alert(e);
		}
	},
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
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from dgw_komisi_d where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update dgw_reg set no_fee='-' where no_fee='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 						
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','MI','KOMISI','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+
							parseNilai(this.e_totalIDR.getText())+",0,0,'-','-','-','-','-','-','-','-','-')");
																				
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];		
						
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+line.no_agen+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.akunKomisi+"','D',"+parseFloat(line.tot_idr)+","+
								parseFloat(line.tot_idr)+",'"+this.e_ket.getText()+"','MI','BEBAN','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");																																			

						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+line.no_agen+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.akunBymhd+"','C',"+parseFloat(line.tot_idr)+","+
								parseFloat(line.tot_idr)+",'"+this.e_ket.getText()+"','MI','BYMHD','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");																																			

						sql.add("insert into dgw_komisi_d (no_akru,kode_lokasi,periode,no_agen,akun_hutang,kurs,nilai,no_kas,kode_curr) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+line.no_agen+"','"+this.akunBymhd+"',"+nilaiToFloat(this.e_kurs.getText())+","+parseFloat(line.tot_fee)+",'-','"+this.c_curr.getText()+"')");				
					}						
					
					for (var i=0;i < this.dataJU1.rs.rows.length;i++){
						var line = this.dataJU1.rs.rows[i];											
						sql.add("update dgw_reg set no_fee='"+this.e_nb.getText()+"' where no_reg='"+line.no_reg+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}

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
					this.sg.clear(1); this.sg1.clear(1); 
					setTipeButton(tbAllFalse);							
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.dataJU = {rs:{rows:[]}};
					this.dataJU1 = {rs:{rows:[]}};	
					this.c_curr.setText("");	
					this.stsSimpan=1;	
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";										
				
				if (nilaiToFloat(this.e_totalIDR.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total komisi tidak boleh nol atau kurang.");
					return false;						
				}				
				if (this.standarLib.doCekPeriode(this.dbLib,"MI",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (MI - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				} 
				else this.simpan();
				break;							
			case "hapus" :	
				this.preView = "0";				
				if (this.standarLib.doCekPeriode(this.dbLib,"MI",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (MI - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from dgw_komisi_d where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update dgw_reg set no_fee='-' where no_fee='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;					
		this.e_periode.setText(y+""+m);					
		if (this.stsSimpan==1) this.doClick();
	},
	doChange: function(sender){
		try{
			if (sender == this.c_curr && this.c_curr.getText() != "" && this.stsSimpan == 1) {				
				if (this.c_curr.getText() == "USD") {
					this.e_kurs.setReadOnly(false);

					var strSQL = "select top 1 kurs from dgw_kurs where kd_curr = '"+this.c_curr.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by id desc ";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.e_kurs.setText(floatToNilai(line.kurs));	
						}					
					}					
				}
				else {
					this.e_kurs.setText("1");	
					this.e_kurs.setReadOnly(true);
				}						
			}			
			if (sender == this.e_kurs && this.e_kurs.getText() != "" && this.stsSimpan == 1) {
				this.doLoadData();	
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doLoadData:function(sender){			
		
		this.pc1.setActivePage(this.pc1.childPage[0]);		
		//Rekap
		var strSQL = "select a.no_agen,a.nama_agen,c.jml,b.total,b.tot_fee,b.tot_fee * "+nilaiToFloat(this.e_kurs.getText())+" as tot_idr "+
					"from ("+
	
					"select distinct a.no_agen,f.nama_agen "+
					"from dgw_reg a "+
					"inner join dgw_paket b on a.no_paket=b.no_paket and a.kode_lokasi=b.kode_lokasi "+
					"inner join dgw_agent f on a.no_agen=f.no_agen and a.kode_lokasi=f.kode_lokasi and substring(f.flag_aktif,1,1) ='1' "+
					"inner join dgw_harga d on a.kode_harga=d.kode_harga and  a.no_paket = d.no_paket and a.kode_lokasi=d.kode_lokasi and d.curr_fee='"+this.c_curr.getText()+"' "+						
					"left join ( "+
					"		select no_reg,kode_lokasi,sum(nilai_p) as bayar from dgw_pembayaran "+
					"		where kode_lokasi='"+this.app._lokasi+"' "+
					"		group by no_reg,kode_lokasi "+
					") e on a.no_reg=e.no_reg and a.kode_lokasi=e.kode_lokasi "+
					"where a.no_fee='-' and a.kode_lokasi ='"+this.app._lokasi+"' and isnull(e.bayar,0) >= b.tarif_agen "+

					") a inner join "+
	
					"("+
					"select a.no_agen,sum(a.harga + a.harga_room) as total, sum(d.fee) as tot_fee "+
					"from dgw_reg a "+
					"inner join dgw_paket b on a.no_paket=b.no_paket and a.kode_lokasi=b.kode_lokasi "+
					"inner join dgw_harga d on a.kode_harga=d.kode_harga and  a.no_paket = d.no_paket and a.kode_lokasi=d.kode_lokasi and d.curr_fee='"+this.c_curr.getText()+"' "+
					"left join ( "+
					"		select no_reg,kode_lokasi,sum(nilai_p) as bayar from dgw_pembayaran "+
					"		where kode_lokasi='"+this.app._lokasi+"' "+
					"		group by no_reg,kode_lokasi "+
					") e on a.no_reg=e.no_reg and a.kode_lokasi=e.kode_lokasi "+
					"where a.no_fee='-' and a.kode_lokasi ='"+this.app._lokasi+"' and isnull(e.bayar,0) >= b.tarif_agen "+
					"group by a.no_agen "+
					
					") b on a.no_agen=b.no_agen "+
					"inner join "+

					"("+
					"select a.no_agen,count(a.no_reg) jml "+
					"from dgw_reg a "+
					"inner join dgw_paket b on a.no_paket=b.no_paket and a.kode_lokasi=b.kode_lokasi "+
					"left join ( "+
					"		select no_reg,kode_lokasi,sum(nilai_p) as bayar from dgw_pembayaran "+
					"		where kode_lokasi='"+this.app._lokasi+"' "+
					"		group by no_reg,kode_lokasi "+
					") e on a.no_reg=e.no_reg and a.kode_lokasi=e.kode_lokasi "+
					"where a.no_fee='-' and a.kode_lokasi ='"+this.app._lokasi+"' and isnull(e.bayar,0) >= b.tarif_agen "+
					"group by a.no_agen "+
					") c on a.no_agen=c.no_agen order by a.no_agen";

		var data = this.dbLib.getDataProvider(strSQL,true);				
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);										
		} else this.sg.clear(1);

		//Detail
		var strSQL = "select a.no_agen+' | '+f.nama_agen as agen,a.no_reg,a.no_paket+' | '+b.nama as paket,c.tgl_berangkat,a.kode_harga+' | '+g.nama as harga,a.no_peserta+' | '+h.nama as jamaah,a.harga as harga_paket,a.harga_room as room,isnull(e.bayar,0) as bayar,d.fee "+
					"from dgw_reg a "+
					"inner join dgw_paket b on a.no_paket=b.no_paket and a.kode_lokasi=b.kode_lokasi "+
					"inner join dgw_jadwal c on a.no_paket=c.no_paket and a.no_jadwal=c.no_jadwal and a.kode_lokasi=b.kode_lokasi "+
					"inner join dgw_harga d on a.kode_harga=d.kode_harga and  a.no_paket = d.no_paket and a.kode_lokasi=d.kode_lokasi and d.curr_fee='"+this.c_curr.getText()+"' "+
					"inner join dgw_agent f on a.no_agen=f.no_agen and a.kode_lokasi=f.kode_lokasi and substring(f.flag_aktif,1,1) ='1' "+
					"inner join dgw_jenis_harga g on a.kode_harga=g.kode_harga and a.kode_lokasi=g.kode_lokasi "+
					"inner join dgw_peserta h on a.no_peserta=h.no_peserta and a.kode_lokasi=h.kode_lokasi "+
					"left join ( "+
					"		select no_reg,kode_lokasi,sum(nilai_p) as bayar from dgw_pembayaran "+
					"		where kode_lokasi='"+this.app._lokasi+"' "+
					"		group by no_reg,kode_lokasi "+
					") e on a.no_reg=e.no_reg and a.kode_lokasi=e.kode_lokasi "+
					"where a.no_fee='-' and a.kode_lokasi ='"+this.app._lokasi+"' and isnull(e.bayar,0) >= b.tarif_agen "+
					"order by a.no_agen,a.no_paket,c.tgl_berangkat";

		var data1 = this.dbLib.getDataProvider(strSQL,true);				
		if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
			this.dataJU1 = data1;
			this.sgn1.setTotalPage(Math.ceil(data1.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData1(1);
			
			var totFee = 0;				
			for (var i=0;i < this.dataJU1.rs.rows.length;i++){
				var line = this.dataJU1.rs.rows[i];
				totFee += parseFloat(line.fee); 					 
			}					
			this.e_total.setText(floatToNilai(totFee));	

			var totIDR = nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.e_kurs.getText())
			this.e_totalIDR.setText(floatToNilai(totIDR));

		} else this.sg1.clear(1);				
			
	},	
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];		
			this.sg.appendData([line.no_agen,line.nama_agen,floatToNilai(line.jml),floatToNilai(line.total),floatToNilai(line.tot_fee),floatToNilai(line.tot_idr),"Detail"]);		
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doTampilData1: function(page) {
		this.sg1.clear();
		var line1;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line1 = this.dataJU1.rs.rows[i];		
			this.sg1.appendData([line1.agen,line1.no_reg,line1.paket,line1.tgl_berangkat,line1.jamaah,line1.harga,floatToNilai(line1.harga_paket),floatToNilai(line1.room),floatToNilai(line1.bayar),floatToNilai(line1.fee)]);		
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
				this.sg.clear(1); this.s1.clear(1); 			
				this.e_total.setText("0"); 
				this.e_totalIDR.setText("0"); 				
				this.dataJU = {rs:{rows:[]}};
				this.dataJU1 = {rs:{rows:[]}};							
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-FEE"+this.e_periode.getText().substr(2,4)+".","0000"));						
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
								//this.nama_report="server_report_saku2_kopeg_sju_rptKbJurnalBukti";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg1.clear(1); 
			this.dataJU = {rs:{rows:[]}};
			this.dataJU1 = {rs:{rows:[]}};							
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.c_curr.setText("");		
			this.stsSimpan=1;		
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																							
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1 "+
		             "from trans_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.form='KOMISI' "+
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,floatToNilai(line.nilai1)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {		
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,row));								
									
				var strSQL = "select * from trans_m "+
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_ket.setText(line.keterangan);	
						this.c_curr.setText(line.kode_curr);	
						this.e_kurs.setText(floatToNilai(line.kurs));						
					}
				}				
				
				//data detail belum
				//Rekap
				var strSQL = "select a.no_agen,a.nama_agen,c.jml,b.total,b.tot_fee,b.tot_fee * "+nilaiToFloat(this.e_kurs.getText())+" as tot_idr "+
							"from ("+
				
							"select distinct a.no_agen,f.nama_agen "+
							"from dgw_reg a "+
							"inner join dgw_paket b on a.no_paket=b.no_paket and a.kode_lokasi=b.kode_lokasi "+
							"inner join dgw_agent f on a.no_agen=f.no_agen and a.kode_lokasi=f.kode_lokasi and substring(f.flag_aktif,1,1) ='1' "+
							"inner join dgw_harga d on a.kode_harga=d.kode_harga and  a.no_paket = d.no_paket and a.kode_lokasi=d.kode_lokasi and d.curr_fee='"+this.c_curr.getText()+"' "+						
							"left join ( "+
							"		select no_reg,kode_lokasi,sum(nilai_p) as bayar from dgw_pembayaran "+
							"		where kode_lokasi='"+this.app._lokasi+"' "+
							"		group by no_reg,kode_lokasi "+
							") e on a.no_reg=e.no_reg and a.kode_lokasi=e.kode_lokasi "+
							"where a.no_fee='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+

							") a inner join "+
				
							"("+
							"select a.no_agen,sum(a.harga + a.harga_room) as total, sum(d.fee) as tot_fee "+
							"from dgw_reg a "+
							"inner join dgw_paket b on a.no_paket=b.no_paket and a.kode_lokasi=b.kode_lokasi "+
							"inner join dgw_harga d on a.kode_harga=d.kode_harga and  a.no_paket = d.no_paket and a.kode_lokasi=d.kode_lokasi and d.curr_fee='"+this.c_curr.getText()+"' "+
							"left join ( "+
							"		select no_reg,kode_lokasi,sum(nilai_p) as bayar from dgw_pembayaran "+
							"		where kode_lokasi='"+this.app._lokasi+"' "+
							"		group by no_reg,kode_lokasi "+
							") e on a.no_reg=e.no_reg and a.kode_lokasi=e.kode_lokasi "+
							"where a.no_fee='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+
							"group by a.no_agen "+
							
							") b on a.no_agen=b.no_agen "+
							"inner join "+

							"("+
							"select a.no_agen,count(a.no_reg) jml "+
							"from dgw_reg a "+
							"inner join dgw_paket b on a.no_paket=b.no_paket and a.kode_lokasi=b.kode_lokasi "+
							"left join ( "+
							"		select no_reg,kode_lokasi,sum(nilai_p) as bayar from dgw_pembayaran "+
							"		where kode_lokasi='"+this.app._lokasi+"' "+
							"		group by no_reg,kode_lokasi "+
							") e on a.no_reg=e.no_reg and a.kode_lokasi=e.kode_lokasi "+

							"where a.no_fee='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+
							"group by a.no_agen "+
							") c on a.no_agen=c.no_agen ";

				var data = this.dbLib.getDataProvider(strSQL,true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);										
				} else this.sg.clear(1);

				//Detail
				var strSQL = "select a.no_agen+' | '+f.nama_agen as agen,a.no_reg,a.no_paket+' | '+b.nama as paket,c.tgl_berangkat,a.kode_harga+' | '+g.nama as harga,a.no_peserta+' | '+h.nama as jamaah,a.harga as harga_paket,a.harga_room as room,isnull(e.bayar,0) as bayar,d.fee "+
							"from dgw_reg a "+
							"inner join dgw_paket b on a.no_paket=b.no_paket and a.kode_lokasi=b.kode_lokasi "+
							"inner join dgw_jadwal c on a.no_paket=c.no_paket and a.no_jadwal=c.no_jadwal and a.kode_lokasi=b.kode_lokasi "+
							"inner join dgw_harga d on a.kode_harga=d.kode_harga and  a.no_paket = d.no_paket and a.kode_lokasi=d.kode_lokasi and d.curr_fee='"+this.c_curr.getText()+"' "+
							"inner join dgw_agent f on a.no_agen=f.no_agen and a.kode_lokasi=f.kode_lokasi and substring(f.flag_aktif,1,1) ='1' "+
							"inner join dgw_jenis_harga g on a.kode_harga=g.kode_harga and a.kode_lokasi=g.kode_lokasi "+
							"inner join dgw_peserta h on a.no_peserta=h.no_peserta and a.kode_lokasi=h.kode_lokasi "+
							"left join ( "+
							"		select no_reg,kode_lokasi,sum(nilai_p) as bayar from dgw_pembayaran "+
							"		where kode_lokasi='"+this.app._lokasi+"' "+
							"		group by no_reg,kode_lokasi "+
							") e on a.no_reg=e.no_reg and a.kode_lokasi=e.kode_lokasi "+
							"where a.no_fee='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+
							"order by a.no_agen,a.no_paket,c.tgl_berangkat";
				var data1 = this.dbLib.getDataProvider(strSQL,true);				
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					this.dataJU1 = data1;
					this.sgn1.setTotalPage(Math.ceil(data1.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData1(1);
					
					var totFee = 0;
					for (var i=0;i < this.dataJU1.rs.rows.length;i++){
						var line = this.dataJU1.rs.rows[i];
						totFee += parseFloat(line.fee); 					 
					}					
					this.e_total.setText(floatToNilai(totFee));	

					var totIDR = nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.e_kurs.getText())
					this.e_totalIDR.setText(floatToNilai(totIDR));

				} else this.sg1.clear(1);	

			}						
		} catch(e) {alert(e);}		
	}
});



