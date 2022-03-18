window.app_saku3_transaksi_dago_fClosingJadwal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fClosingJadwal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fClosingJadwal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Closing Jadwal", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Akru","Tanggal","No Dokumen","Deskripsi","Total"],
					colWidth:[[4,3,2,1,0],[100,250,150,80,100]],
					colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,470,20],caption:"Deskripsi", maxLength:150});												
		
		this.c_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Currency",readOnly:true,tag:2});		
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[290,16,200,22],caption:"Kurs", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_titip = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Total Titipan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.cb_paket = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Paket", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_piutang = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Total Tunggkan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.cb_jadwal = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Jadwal", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_pdpt = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Total Pdpt", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[680,12,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,13,990,282], childPage:["Reg Lunas"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,250],colCount:13,tag:0,
		            colTitle:["No Reg","Peserta","Hrg Paket+Room","Biaya+","Byr Paket+Room","Byr Biaya+","Tggkan Paket+Room","Tggkn Biaya+","TotBayar IDR","Tot Tunggkan","Akun Titip","Akun Piu","Akun Pdpt"],										
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,100,100,100,120,120,100,100,100,200,100]],
					colHide:[[8,9,10,11,12],[true,true,true,true,true]],
					readOnly:true,
					colFormat:[[2,3,4,5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],									
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
						
		
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.dataJU = {rs:{rows:[]}};	
			this.cb_paket.setSQL("select no_paket, nama from dgw_paket where kode_lokasi='"+this.app._lokasi+"'",["no_paket","nama"],false,["Kode","Nama"],"and","Data Paket",true);
			
			this.c_curr.setText("USD");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fClosingJadwal.extend(window.childForm);
window.app_saku3_transaksi_dago_fClosingJadwal.implement({
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
						sql.add("update dgw_jadwal set no_closing='-',kurs_closing=0 where no_closing='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 										
					sql.add("insert into haj_akru_m (no_akru,kode_lokasi,no_paket,no_jadwal,tanggal,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_paket.getText()+"','"+this.cb_jadwal.rightLabelCaption+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','HAJAKRU','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+parseNilai(this.e_pdpt.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F')");
																				
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];
						var totPdpt = parseFloat(line.tot_bayaridr) + parseFloat(line.tot_saldo_idr);
						sql.add("insert into haj_akru_j(no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+line.no_reg+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.akun_titip+"','"+this.e_ket.getText()+"','D',"+parseFloat(line.tot_bayaridr)+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','HAJAKRU','TITIP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
						sql.add("insert into haj_akru_j(no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+line.no_reg+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.akun_piutang+"','"+this.e_ket.getText()+"','D',"+parseFloat(line.tot_saldo_idr)+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','HAJAKRU','PIUTANG','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
						sql.add("insert into haj_akru_j(no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+line.no_reg+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.akun_pdpt+"','"+this.e_ket.getText()+"','C',"+totPdpt+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','HAJAKRU','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
					}						
					
					sql.add("update dgw_jadwal set no_closing='"+this.e_nb.getText()+"',kurs_closing="+nilaiToFloat(this.e_kurs.getText())+" where no_paket='"+this.cb_paket.getText()+"' and no_jadwal='"+this.cb_jadwal.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
												
				if ((nilaiToFloat(this.e_titip.getText()) + nilaiToFloat(this.e_piutang.getText())) != nilaiToFloat(this.e_pdpt.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Titipan + Total Tunggakan tidak sama dengan Total Pdpt.");
					return false;						
				}
				if (nilaiToFloat(this.e_pdpt.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total pendapatan tidak boleh nol atau kurang.");
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
					sql.add("update dgw_jadwal set no_closing='-',kurs_closing=0 where no_closing='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	doChange: function(sender){
		try{
			if (sender == this.cb_paket && this.cb_paket.getText() != ""){			
				this.cb_jadwal.setSQL("select convert(varchar,tgl_berangkat,103) as tgl,no_jadwal from dgw_jadwal where no_closing='-' and no_paket ='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["tgl","no_jadwal"],false,["Tanggal","ID"],"and","Data Jadwal",true);			
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doLoadData:function(sender){		
		if (this.cb_paket.getText()!="" && this.cb_jadwal.getText()!="" && this.e_kurs.getText()!="" && this.e_kurs.getText()!="0") {			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			var strSQL = "select "+
						 " a.no_reg,b.no_peserta+' - '+b.nama as nama, f.kode_akun as akun_titip,f.akun_piutang,f.akun_pdpt, "+
						 
						 " (a.harga+a.harga_room) as harga_paket,isnull(d.biaya,0) as biaya, "+						
						 " isnull(e.bayar_p,0) as bayar_p, isnull(e.bayar_t,0) as bayar_t,  "+
						 " (a.harga+a.harga_room) - isnull(e.bayar_p,0) as saldo_p, isnull(d.biaya,0) - isnull(e.bayar_t,0) as saldo_t, "+
						 
						 " isnull(e.bayar_p_idr,0) + isnull(e.bayar_t,0) as  tot_bayaridr, "+
						 " (case when ((a.harga+a.harga_room) - isnull(e.bayar_p,0) <> 0) then (  ((a.harga+a.harga_room) - isnull(e.bayar_p,0)) * "+nilaiToFloat(this.e_kurs.getText())+"  ) else 0 end) + (isnull(d.biaya,0) - isnull(e.bayar_t,0)) as tot_saldo_idr "+
						 
						
						 "from dgw_reg a  "+

						 "inner join dgw_jadwal c on a.no_paket=c.no_paket and a.no_jadwal=c.no_jadwal and a.kode_lokasi=c.kode_lokasi and c.no_closing='-' "+
						 "inner join dgw_peserta b on a.no_peserta=b.no_peserta and a.kode_lokasi =b.kode_lokasi "+
						 "inner join dgw_paket g on a.no_paket=g.no_paket and a.kode_lokasi =g.kode_lokasi "+
						 "inner join dgw_jenis_produk f on g.kode_produk=f.kode_produk and g.kode_lokasi =f.kode_lokasi "+
						 
						 "left join ( "+
						 "  select kode_lokasi,no_reg,sum(nilai) as biaya "+
						 "  from dgw_reg_biaya where kode_lokasi ='"+this.app._lokasi+"' "+
						 "  group by kode_lokasi,no_reg "+
						 ") d on a.no_reg=d.no_reg and a.kode_lokasi=d.kode_lokasi "+
						 
						 "left join ("+						 
						 "  select  no_reg,kode_lokasi,sum(nilai_p) as bayar_p,sum(nilai_t) as bayar_t,sum(nilai_p * kurs) as bayar_p_idr "+
						 "  from dgw_pembayaran where kode_lokasi ='"+this.app._lokasi+"' "+
						 "  group by kode_lokasi,no_reg "+						 
						 ") e on a.no_reg=e.no_reg and a.kode_lokasi=e.kode_lokasi "+

						 "where a.kode_lokasi ='"+this.app._lokasi+"' and a.no_paket='"+this.cb_paket.getText()+"' and a.no_jadwal='"+this.cb_jadwal.rightLabelCaption+"'";
								
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				this.dataJU = data1;
				this.sgn.setTotalPage(Math.ceil(data1.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
				
				
				totTitip = totPiu = totPdpt = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					var line = this.dataJU.rs.rows[i];
					totTitip += parseFloat(line.tot_bayaridr); 
					totPiu += parseFloat(line.tot_saldo_idr); 
					totPdpt += parseFloat(line.tot_bayaridr) + parseFloat(line.tot_saldo_idr); 
				}	
				
				this.e_titip.setText(floatToNilai(totTitip));
				this.e_piutang.setText(floatToNilai(totPiu));
				this.e_pdpt.setText(floatToNilai(totPdpt));
								
			} else this.sg.clear(1);																			
		}	
		else system.alert(this,"Paket, Jadwal dan Kurs tidak valid.","");
	},	
	doTampilData: function(page) {
		this.sg.clear();
		var line1;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line1 = this.dataJU.rs.rows[i];		
			this.sg.appendData([line1.no_reg,line1.nama,floatToNilai(line1.harga_paket),floatToNilai(line1.biaya),floatToNilai(line1.bayar_p),floatToNilai(line1.bayar_t),floatToNilai(line1.saldo_p),floatToNilai(line1.saldo_t), floatToNilai(line1.tot_bayaridr),floatToNilai(line1.tot_saldo_idr), line1.akun_titip,line1.akun_piutang,line1.akun_pdpt]);		
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.standarLib.clearByTag(this, new Array("3"),this.e_nb);
				this.sg.clear(1); 			
				this.e_titip.setText("0"); this.e_piutang.setText("0"); this.e_pdpt.setText("0");
				this.bTampil.setVisible(true);
				this.dataJU = {rs:{rows:[]}};
				this.cb_jadwal.setSQL("select convert(varchar,tgl_berangkat,103) as tgl,no_jadwal from dgw_jadwal where no_closing='-' and no_paket ='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["tgl","no_jadwal"],false,["Tanggal","ID"],"and","Data Jadwal",true);							
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
			this.sg.clear(1); 
			setTipeButton(tbAllFalse);		
			this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.dataJU = {rs:{rows:[]}};
			this.cb_jadwal.setSQL("select convert(varchar,tgl_berangkat,103) as tgl,no_jadwal from dgw_jadwal where no_closing='-' and no_paket ='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["tgl","no_jadwal"],false,["Tanggal","ID"],"and","Data Jadwal",true);						
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																							
		var strSQL = "select a.no_akru,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from haj_akru_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='HAJAKRU' "+
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
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.bTampil.setVisible(false);
				this.e_nb.setText(this.sg3.cells(0,row));								
				
									
				var strSQL = "select * from haj_akru_m "+
							 "where no_akru = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_ket.setText(line.keterangan);	
						this.c_curr.setText(line.kode_curr);	
						this.e_kurs.setText(floatToNilai(line.kurs));	
						this.cb_paket.setText(line.no_paket);	
						this.cb_jadwal.setSQL("select convert(varchar,tgl_berangkat,103) as tgl,no_jadwal from dgw_jadwal where no_closing='"+this.e_nb.getText()+"' and no_paket ='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["tgl","no_jadwal"],false,["Tanggal","ID"],"and","Data Jadwal",true);			
						this.cb_jadwal.setText(line.no_jadwal);
					}
				}				
				
				var strSQL = "select "+
					 " a.no_reg,b.no_peserta+' - '+b.nama as nama, f.kode_akun as akun_titip,f.akun_piutang,f.akun_pdpt, "+
					 
					 " (a.harga+a.harga_room) as harga_paket,isnull(d.biaya,0) as biaya, "+						
					 " isnull(e.bayar_p,0) as bayar_p, isnull(e.bayar_t,0) as bayar_t,  "+
					 " (a.harga+a.harga_room) - isnull(e.bayar_p,0) as saldo_p, isnull(d.biaya,0) - isnull(e.bayar_t,0) as saldo_t, "+
					 
					 " isnull(e.bayar_p_idr,0) + isnull(e.bayar_t,0) as  tot_bayaridr, "+
					 " (case when ((a.harga+a.harga_room) - isnull(e.bayar_p,0) <> 0) then (  ((a.harga+a.harga_room) - isnull(e.bayar_p,0)) * "+nilaiToFloat(this.e_kurs.getText())+"  ) else 0 end) + (isnull(d.biaya,0) - isnull(e.bayar_t,0)) as tot_saldo_idr "+
					 
					
					 "from dgw_reg a  "+

					 "inner join dgw_jadwal c on a.no_paket=c.no_paket and a.no_jadwal=c.no_jadwal and a.kode_lokasi=c.kode_lokasi and c.no_closing='-' "+
					 "inner join dgw_peserta b on a.no_peserta=b.no_peserta and a.kode_lokasi =b.kode_lokasi "+
					 "inner join dgw_paket g on a.no_paket=g.no_paket and a.kode_lokasi =g.kode_lokasi "+
					 "inner join dgw_jenis_produk f on g.kode_produk=f.kode_produk and g.kode_lokasi =f.kode_lokasi "+
					 
					 "left join ( "+
					 "  select kode_lokasi,no_reg,sum(nilai) as biaya "+
					 "  from dgw_reg_biaya where kode_lokasi ='"+this.app._lokasi+"' "+
					 "  group by kode_lokasi,no_reg "+
					 ") d on a.no_reg=d.no_reg and a.kode_lokasi=d.kode_lokasi "+
					 
					 "left join ("+						 
					 "  select  no_reg,kode_lokasi,sum(nilai_p) as bayar_p,sum(nilai_t) as bayar_t,sum(nilai_p * kurs) as bayar_p_idr "+
					 "  from dgw_pembayaran where kode_lokasi ='"+this.app._lokasi+"' "+
					 "  group by kode_lokasi,no_reg "+						 
					 ") e on a.no_reg=e.no_reg and a.kode_lokasi=e.kode_lokasi "+

					 "where c.kode_lokasi ='"+this.app._lokasi+"' and c.no_closing='"+this.e_nb.getText()+"'";
								
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
			
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					this.dataJU = data1;
					this.sgn.setTotalPage(Math.ceil(data1.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				
					totTitip = totPiu = totPdpt = 0;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];
						totTitip += parseFloat(line.tot_bayaridr); 
						totPiu += parseFloat(line.tot_saldo_idr); 
						totPdpt += parseFloat(line.tot_bayaridr) + parseFloat(line.tot_saldo_idr); 
					}	
				
					this.e_titip.setText(floatToNilai(totTitip));
					this.e_piutang.setText(floatToNilai(totPiu));
					this.e_pdpt.setText(floatToNilai(totPdpt));
								
				} else this.sg.clear(1);
						
			}						
		} catch(e) {alert(e);}		
	}
});



