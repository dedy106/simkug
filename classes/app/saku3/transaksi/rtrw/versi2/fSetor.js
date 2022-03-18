window.app_saku3_transaksi_rtrw_versi2_fSetor = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_versi2_fSetor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_versi2_fSetor";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Setoran Iuran RW: Input/Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Setoran","List Setoran"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","N Titipan"],
					colWidth:[[3,2,1,0],[100,300,80,100]],
					readOnly:true,
					colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,470,20],caption:"Deskripsi", maxLength:150});										
		this.cb_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Jenis Iuran", multiSelection:false, maxLength:10, tag:2,text:"IWAJIB", change:[this,"doChange"]});							
		this.c_perFilter = new saiCB(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Periode Bill",items:["<= PERIODE","ALL"], readOnly:true,tag:8});				
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[270,17,200,20],caption:"Status Setor",items:["TUNAI","TRANSFER","ALL"], readOnly:true,tag:8});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total Titipan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[680,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,305], childPage:["Data Iuran","Rekap"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,280],colCount:7,tag:0,
		            colTitle:["No Rumah","Keterangan","Periode Bill","No KB RT","Nilai RW","Nilai RT","Total Iuran"],					
					colWidth:[[6,5,4,3,2,1,0],[80,80,80,100,80,250,100]],readOnly:true,colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
				
		this.e_totiur = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Total Terima", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_jum = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Jumlah Iuran", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_sumbang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Sumbangan", tag:1, tipeText:ttNilai, text:"100.000",change:[this,"doChange"]});		
		this.e_kasrt = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Kas RT", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_gaji = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Gaji Petugas", tag:1, tipeText:ttNilai, text:"1.200.000",change:[this,"doChange"]});				
		this.e_kasrw = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Kas RW", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		

		this.e_setor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Setor RW", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		
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

			this.cb_jenis.setSQL("select kode_jenis,nama from rt_iuran_jenis where status = 'TITIPAN' and kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Iuran",true);						
			
			this.c_perFilter.setText("ALL");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_versi2_fSetor.extend(window.childForm);
window.app_saku3_transaksi_rtrw_versi2_fSetor.implement({
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
						sql.add("delete from rt_setor_m where no_setor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update rt_angs_d set no_setor='-' where no_setor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					} 					
					
					sql.add("insert into rt_setor_m (no_setor,kode_lokasi,tanggal,keterangan,kode_pp,modul,periode,nilai,tgl_input,nik_user,no_kas, jml_iuran,sumbangan,gaji_bersih,kas_rt,kas_rw ) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','"+this.cb_jenis.getText()+"','"+this.e_periode.getText()+"',"+parseNilai(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','-', "+nilaiToFloat(this.e_jum.getText())+","+nilaiToFloat(this.e_sumbang.getText())+","+nilaiToFloat(this.e_gaji.getText())+","+nilaiToFloat(this.e_kasrt.getText())+","+nilaiToFloat(this.e_kasrw.getText())+" )");																								
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								sql.add("update rt_angs_d set no_setor='"+this.e_nb.getText()+"' where no_setor='-' and kode_rumah='"+this.sg.cells(0,i)+"' and periode_bill='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"' and kode_jenis='"+this.cb_jenis.getText()+"'");
							}
						}						
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
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
												
				if (nilaiToFloat(this.e_total.getText()) == 0) {
					system.alert(this,"Transaksi tidak valid.","Toral tidak boleh nol.");
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
					sql.add("delete from rt_setor_m where no_setor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update rt_angs_d set no_setor='-' where no_setor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
		if (this.e_periode.getText()!="" && this.cb_jenis.getText()!="") {			
			
			if (this.c_perFilter.getText() == "ALL") var cFilter = " ";
			else var cFilter = " a.periode_bill <= '"+this.e_periode.getText()+"' and ";

			if (this.c_status.getText() != "ALL") var cFilter = cFilter + "  d.no_ref1='"+this.c_status.getText()+"' and ";
			else var cFilter = cFilter + " ";
													   
			var tot = this.totrt = this.totiur = 0; 
			var data1 = this.dbLib.getDataProvider("select a.kode_rumah,c.nama as keterangan,a.periode_bill,sum(a.nilai_rw) as nilai_rw,sum(a.nilai_rt) as nilai_rt, sum(a.nilai_rw+a.nilai_rt) as total_iur  "+ //sum(case when a.periode_bill in ('201707','201708','201709','201710') then a.nilai_rw+a.nilai_rt else a.nilai_rw end)
												   "from rt_angs_d a inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi "+
												   "				 inner join rt_warga c on b.kode_penghuni=c.nik "+
												   "				 inner join trans_m d on a.no_angs=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+
												   "where a.kode_jenis='"+this.cb_jenis.getText()+"' and "+cFilter+" a.kode_lokasi ='"+this.app._lokasi+"' and a.no_setor = '-' "+
												   "group by a.kode_rumah,c.nama,a.periode_bill "+
												   "order by a.kode_rumah",true);	
			
			
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];
					tot += parseFloat(line1.nilai_rw);
					this.totrt += parseFloat(line1.nilai_rt);
					this.totiur += parseFloat(line1.total_iur);
					this.sg.appendData([line1.kode_rumah,line1.keterangan,line1.periode_bill,"SUMMARY",floatToNilai(line1.nilai_rw),floatToNilai(line1.nilai_rt),floatToNilai(line1.total_iur)]);
				}
			} else this.sg.clear(1);				
			this.e_total.setText(floatToNilai(tot));			
			this.e_totiur.setText(floatToNilai(this.totiur));
			this.e_jum.setText(floatToNilai(this.sg.getRowCount()));
			
			this.doChange(this.e_sumbang);
			this.doChange(this.e_gaji);
		}
		else system.alert(this,"Periode dan Jenis Iuran harus dipilih.","");
	},	
	doChange:function(sender){		
		if (sender == this.e_sumbang && this.e_sumbang.getText()!="") {
			var kasrt = this.totrt - nilaiToFloat(this.e_sumbang.getText());
			this.e_kasrt.setText(floatToNilai(kasrt));

			var kasrw = this.totiur - this.totrt - nilaiToFloat(this.e_gaji.getText());
			this.e_setor.setText(floatToNilai(kasrw+nilaiToFloat(this.e_sumbang.getText())));
		}
		if (sender == this.e_gaji && this.e_gaji.getText()!="") {
			var kasrw = this.totiur - this.totrt - nilaiToFloat(this.e_gaji.getText());
			this.e_kasrw.setText(floatToNilai(kasrw));
			this.e_setor.setText(floatToNilai(kasrw+nilaiToFloat(this.e_sumbang.getText())));
		}
	},
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.standarLib.clearByTag(this, new Array("3"),this.e_nb);
				this.sg.clear(1); 				
				this.e_total.setText("0");
				this.bTampil.setVisible(true);
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rt_setor_m","no_setor",this.app._lokasi+"-STR"+this.e_periode.getText().substr(2,4)+".","0000"));						
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
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																							
		var strSQL = "select no_setor,convert(varchar,tanggal,103) as tgl,keterangan,nilai "+
		             "from rt_setor_m a "+					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas = '-' ";
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
			this.sg3.appendData([line.no_setor,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
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
								
				var strSQL = "select * "+
							 "from rt_setor_m "+
							 "where no_setor = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																						
						this.e_ket.setText(line.keterangan);		

					}
				}
				
				var tot = this.totrt = this.totiur = 0; 
				var data1 = this.dbLib.getDataProvider("select a.kode_rumah,c.nama as keterangan,a.periode_bill, sum(a.nilai_rw) as nilai_rw,sum(a.nilai_rt) as nilai_rt, sum(a.nilai_rw+a.nilai_rt) as total_iur "+ // sum(case when a.periode_bill in ('201707','201708','201709','201710') then a.nilai_rw+a.nilai_rt else a.nilai_rw end) as nilai_rw 
													   "from rt_angs_d a "+
													   "				 inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi "+
													   "				 inner join rt_warga c on b.kode_penghuni=c.nik "+
													   "where a.kode_lokasi ='"+this.app._lokasi+"' and a.no_setor = '"+this.e_nb.getText()+"' "+
													   "group by a.kode_rumah,c.nama,a.periode_bill order by a.kode_rumah",true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];
						tot += parseFloat(line1.nilai_rw);
						this.totrt += parseFloat(line1.nilai_rt);
						this.totiur += parseFloat(line1.total_iur);
						this.sg.appendData([line1.kode_rumah,line1.keterangan,line1.periode_bill,"SUMMARY",floatToNilai(line1.nilai_rw),floatToNilai(line1.nilai_rt),floatToNilai(line1.total_iur)]);
					}
				} else this.sg.clear(1);				
				this.e_total.setText(floatToNilai(tot));
				this.e_totiur.setText(floatToNilai(this.totiur));
				this.e_jum.setText(floatToNilai(this.sg.getRowCount()));
				
				this.doChange(this.e_sumbang);
				this.doChange(this.e_gaji);
							
			}						
		} catch(e) {alert(e);}		
	}
});