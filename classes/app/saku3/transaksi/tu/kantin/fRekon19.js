window.app_saku3_transaksi_tu_kantin_fRekon19 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kantin_fRekon19.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kantin_fRekon19";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pembayaran Sharing Tenan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Pembayaran","List Transaksi"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","Nilai"],
					colWidth:[[3,2,1,0],[100,300,100,100]],						
					readOnly:true,
					colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Closing",click:[this,"doLoad"]});
		
		this.e_agenda = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No Agenda", maxLength:20, tag:1,readOnly:true, change:[this,"doChange"]});				
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});													
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Deskripsi", maxLength:100, tag:1});					
		this.bTampil = new button(this.pc1.childPage[0],{bound:[520,15,80,18],caption:"Tampil Data",click:[this,"doCari"]});					
		this.i_bAll = new portalui_imageButton(this.pc1.childPage[0],{bound:[610,15,20,20],hint:"App All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.bProses = new button(this.pc1.childPage[0],{bound:[650,15,80,18],caption:"Proses Data",click:[this,"detailNota"]});					
		this.e_beban = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[790,15,200,20],caption:"Total Beban", maxLength:100, tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,30,995,350], childPage:["Data Load","Data Tenan","Data Pembayaran"]});			
		this.sg4 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:1,
		            colTitle:["Status","No. Load","Tanggal","Kantin","Tot Nota","Tot Kasir","Tot Bayar"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,300,80,120,80]],
					columnReadOnly:[true,[0,1,2,3,4,5,6]],										
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick4"],
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["PROSES","INPROG"]})]],
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		this.sg2 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-6,this.pc2.height-33],colCount:6,
					colTitle:["ID Tenan","Nama Tenan","Tot Nota","U. Bersih","Tot Sharing","Tot Fee"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,200,100]],
					colFormat:[[2,3,4,5],[cfNilai,cfNilai,cfNilai,cfNilai]],					
					readOnly:true, defaultRow:1
					});							
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPager2"]});		

		this.sg3 = new portalui_saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-6,this.pc2.height-33],colCount:4,
					colTitle:["ID Bayar","Jenis Pembayaran","ID Akun","Nilai"],
					colWidth:[[3,2,1,0],[100,100,200,100]],
					colFormat:[[3],[cfNilai]],					
					readOnly:true, defaultRow:1
					});							
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg3, pager:[this,"doPager3"]});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);

		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);	
			
			var data = this.dbLib.getDataProvider("select kode_param,flag from kantin_param where kode_param in ('BBNKTN','DRKBEBAN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_param == "BBNKTN") this.akunBeban = line.flag;								
					if (line.kode_param == "DRKBEBAN") this.DRKBeban = line.flag;								
				}
			}

			var data = this.dbLib.getDataProvider("select kode_spro,value1,value2 from spro where kode_spro in ('HKEB','UKEB') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "HKEB") {
						this.awal = parseInt(line.value1);
						this.akhir = parseInt(line.value2);
					}
					if (line.kode_spro == "UKEB") this.ubersih = parseFloat(line.value1);
				}
			}

			
		}catch(e){
			systemAPI.alert(e);
		}
		
	}
};
window.app_saku3_transaksi_tu_kantin_fRekon19.extend(window.childForm);
window.app_saku3_transaksi_tu_kantin_fRekon19.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);							
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if(this.stsSimpan == 0){						
						sql.add("update kantin_load set no_bast='-' where no_bast = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");													

						sql.add("delete from it_aju_m where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from it_aju_multi where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from it_aju_rek where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from angg_r where no_bukti = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from kantin_ubersih where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					var line;
					for (var i=0;i < this.dataJU4.rs.rows.length;i++){
						line = this.dataJU4.rs.rows[i];
						if (line.status.toUpperCase()=="PROSES"){
							sql.add("update kantin_load set no_bast='"+this.e_agenda.getText()+"' where no_load = '"+line.no_load+"' and kode_lokasi='"+this.app._lokasi+"' ");													
					
						}
					}
					//--------
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,nik_app) values "+
						    "('"+this.e_agenda.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','UMUM','"+this.akunBeban+"','"+this.app._kodePP+"','"+this.DRKBeban+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_beban.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','-','-','"+this.app._namaUser+"','KANTIN','NON',0,'"+this.app._userLog+"')");					
					sql.add("insert into it_aju_multi(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+							
							"('"+this.e_agenda.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_periode.getText()+"','"+this.akunBeban+"','"+this.app._kodePP+"','"+this.DRKBeban+"','D','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_beban.getText())+",'BEBAN')");

					for (var i = 0;i < this.dataJU2.rs.rows.length;i++){
						var line = this.dataJU2.rs.rows[i];				
						sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
								"('"+this.e_agenda.getText()+"','"+this.app._lokasi+"','"+line.bank+"','"+line.norek+"','"+line.namarek+"','-',"+parseFloat(line.sharing)+",'-')");							
						sql.add("insert into kantin_ubersih(no_aju,kode_lokasi,kode_tenan,nilai_share,ubersih,fee) values "+
								"('"+this.e_agenda.getText()+"','"+this.app._lokasi+"','"+line.kode_tenan+"',"+parseFloat(line.sharing)+","+parseFloat(line.ubersih)+","+parseFloat(line.fee)+")");		
					}

					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_agenda.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"','"+this.akunBeban+"','"+this.app._kodePP+"','"+this.DRKBeban+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.e_beban.getText())+")");
					
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_agenda);
				setTipeButton(tbAllFalse);				
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.i_bAll.show();
				this.bTampil.show();
				this.sg1.clear(1);
				this.sg4.clear(1); 
				this.stsSimpan = 1;
				this.doClick(this.i_gen);				
				break;				
			case "simpan" :	
			case "ubah" :
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_beban.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai total tidak boleh 0 atau kurang.");
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
				else 
				this.simpan();
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
					sql.add("update kantin_load set no_bast='-' where no_bast = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");													
					
					sql.add("delete from it_aju_m where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from it_aju_multi where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from angg_r where no_bukti = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from kantin_ubersih where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;					
		}
	},	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.doLoad();
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},		
	doClick: function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {
				this.i_bAll.show();
				this.bTampil.show();
				this.sg1.clear(1);
				this.sg4.clear(1); 
			}					
			this.e_agenda.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
			this.stsSimpan = 1;
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);	
		}
		if (sender == this.i_bAll) {
			for (var i = 0;i < this.dataJU4.rs.rows.length;i++){
				this.dataJU4.rs.rows[i].stsapp = "PROSES";		
				this.sg4.cells(0,i,"PROSES");		
			}	
		}	
	},			
	doCari:function(sender){								
		try {
			var strSQL = "select 'INPROG' as status,a.no_load,convert(varchar,a.tanggal,103) as tgl,a.kode_kantin+' | '+b.nama as kantin, a.total_nota,a.total_kasir,a.total_bayar "+
						 "from kantin_load a inner join ktu_kantin b on a.kode_kantin=b.kode_kantin and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_bast = '-' and a.kode_lokasi='"+this.app._lokasi+"'";													
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU4 = data;
				this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn4.rearrange();
				this.doTampilData4(1);
			} else this.sg4.clear(1);

			this.pc2.setActivePage(this.pc2.childPage[0]);																		
		}	 		
		catch(e) {
			alert(e);
		}
	},
	doTampilData4: function(page) {
		this.sg4.clear();
		var line2;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line2 = this.dataJU4.rs.rows[i];																 
			this.sg4.appendData([line2.status.toUpperCase(),line2.no_load,line2.tgl,line2.kantin,floatToNilai(line2.total_nota),floatToNilai(line2.total_kasir),floatToNilai(line2.total_bayar)]);
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},
	doChangeCell: function(sender, col, row){		
		if (col == 0 ){
			this.dataJU4.rs.rows[((this.page-1)*20) + row].status = this.sg4.cells(0,row);
			this.sg4.validasi();	
			sg2.clear(1);
			sg3.clear(1);		
		}
	},
	doDoubleClick4: function(sender, col , row) {
		if(this.sg4.cells(0,row) == "INPROG") this.sg4.cells(0,row,"PROSES");
		else this.sg4.cells(0,row,"INPROG");
	},
	doNilaiChange: function(){
		var tot = 0;		
		for (var i = 0;i < this.dataJU4.rs.rows.length;i++){
			var line = this.dataJU4.rs.rows[i];
			if (line.status.toUpperCase() == "PROSES"){			
				tot += parseFloat(line.total_bayar);	
			}
		}			
		this.e_tot.setText(floatToNilai(tot));			
	},
	detailNota: function() {
		var noLoad = "";
		for (var i = 0;i < this.dataJU4.rs.rows.length;i++){
			var line = this.dataJU4.rs.rows[i];
			if (line.status.toUpperCase() == "PROSES"){			
				noLoad += ",'"+line.no_load+"'";
			}
		}
		noLoad = noLoad.substr(1);	
		if (noLoad == "") {
			system.alert(this,"Tidak ada data Nota (UPLOAD) yang berstatus PROSES","Pilih data Nota (LOAD) yang akan diproses dengan mengubah statusnya.");
			return false;
		}
		else {			
			var strSQL = "select a.kode_tenan,b.nama,sum(a.nilai) as nilai,round( sum(c.persen/100 * a.nilai) ,0) - (case when jumbersih = 0 then 0 else "+this.ubersih+" end) as sharing, sum(a.nilai)-round(sum(c.persen/100 * a.nilai),0) as fee, "+
					 "b.bank as bank,b.norek,b.namarek, "+
					 "case when jumbersih = 0 then 0 else "+this.ubersih+" end as ubersih "+
					 "from kantin_nota a "+
					 "inner join ktu_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi "+
					 "inner join kantin_load c on a.no_load=c.no_load and a.kode_lokasi=c.kode_lokasi "+
					 "inner join ( "+
					 "	select x.kode_tenan, sum(case when datepart(dw, y.tanggal) between "+this.awal+" and "+this.akhir+" then 1 else 0 end) as jumbersih "+ 
					 "	from kantin_nota x inner join kantin_load y on x.no_load=y.no_load and x.kode_lokasi=x.kode_lokasi "+
					 "	where y.no_load in ("+noLoad+") and y.kode_lokasi='"+this.app._lokasi+"' "+ 
					 "	group by x.kode_tenan "+
					 "  ) d on d.kode_tenan=b.kode_tenan "+

					 "where a.no_load in ("+noLoad+") and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "group by a.kode_tenan,b.nama,b.bank,b.norek,b.namarek, case when jumbersih = 0 then 0 else "+this.ubersih+" end  "+
					 "having round( sum(c.persen/100 * a.nilai) ,0) - (case when jumbersih = 0 then 0 else "+this.ubersih+" end) > 0";	


			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU2 = data;
				this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/100));
				this.sgn2.rearrange();
				this.doTampilData2(1);

				var tot = 0;		
				for (var i = 0;i < this.dataJU2.rs.rows.length;i++){
					var line = this.dataJU2.rs.rows[i];				
					tot += parseFloat(line.sharing);						
				}			
				this.e_beban.setText(floatToNilai(tot));			
				
			} else this.sg2.clear(1);


			var strSQL = "select a.kode_bayar,b.ket,b.kb,sum(a.nilai) as nilai "+
					 "from kantin_bayar a inner join ktu_jbayar b on a.kode_bayar=b.kode_bayar and a.kode_lokasi=b.kode_lokasi "+
					 "where a.no_load in ("+noLoad+") and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "group by a.kode_bayar,b.kb,b.ket";	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU3 = data;
				this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/100));
				this.sgn3.rearrange();
				this.doTampilData3(1);
			} else this.sg3.clear(1);

		}
		this.pc2.setActivePage(this.pc2.childPage[1]);	
	},
	doTampilData2: function(page) {
		this.sg2.clear();
		var line2;
		this.page = page;
		var start = (page - 1) * 100;
		var finish = (start + 100 > this.dataJU2.rs.rows.length? this.dataJU2.rs.rows.length:start+100);
		for (var i=start;i<finish;i++){
			line2 = this.dataJU2.rs.rows[i];			
			this.sg2.appendData([line2.kode_tenan,line2.nama,floatToNilai(line2.nilai),floatToNilai(line2.ubersih),floatToNilai(line2.sharing),floatToNilai(line2.fee)]);
		}
		this.sg2.setNoUrut(start);
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line2;
		this.page = page;
		var start = (page - 1) * 100;
		var finish = (start + 100 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+100);
		for (var i=start;i<finish;i++){
			line2 = this.dataJU3.rs.rows[i];																 
			this.sg3.appendData([line2.kode_bayar,line2.ket,line2.kb,floatToNilai(line2.nilai)]);
		}
		this.sg3.setNoUrut(start);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_tu_kantin_rptPb";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_agenda.getText()+"' ";
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
								this.pc1.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_agenda.getText()+")","");							
								this.clearLayar();
							} 
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_agenda);			
			setTipeButton(tbAllFalse);				
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.i_bAll.show();
			this.bTampil.show();
			this.sg1.clear(1);
			this.sg2.clear(1); 
			this.sg3.clear(1); 
			this.sg4.clear(1); 
			this.stsSimpan = 1;
			this.doClick(this.i_gen);	
		} catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){						
			var strSQL = "select a.no_aju as no_bukti, convert(varchar,a.tanggal,103) as tanggal, a.keterangan, a.nilai as nilai1 "+
						 "from it_aju_m a "+
						 "where a.progress in ('A','F','R') and a.form = 'KANTIN' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' ";			
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line4;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line4 = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line4.no_bukti,line4.tanggal,line4.keterangan,floatToNilai(line4.nilai1)]); 							
			}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_agenda.setText(this.sg1.cells(0,row));
				this.i_bAll.hide();
				this.bTampil.hide();
				this.stsSimpan=0;

				var strSQL = "select * from it_aju_m where no_aju ='"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);					
						this.e_ket.setText(line.keterangan);												
					}
				}

				var strSQL= "select 'PROSES' as status,a.no_load,convert(varchar,a.tanggal,103) as tgl,a.kode_kantin+' | '+b.nama as kantin, a.total_nota,a.total_kasir,a.total_bayar "+
							"from kantin_load a inner join ktu_kantin b on a.kode_kantin=b.kode_kantin and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bast = '"+this.e_agenda.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";																									
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU4 = data;
					this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn4.rearrange();
					this.doTampilData4(1);
				} else this.sg4.clear(1);	
				this.detailNota();		
			}
		} catch(e) 
			{	alert(e);
		}
	}
});
