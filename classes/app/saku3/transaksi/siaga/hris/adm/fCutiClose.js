window.app_saku3_transaksi_siaga_hris_adm_fCutiClose = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fCutiClose.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fCutiClose";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Cuti: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	

		// this.pc2 = new pageControl(this,{bound:[20,12,1000,460], childPage:["Pemutihan","Pemutihan Cuti Besar"]});

		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.tahun = new portalui_saiLabelEdit(this,{bound:[220,11,200,20],caption:"Tahun",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Close",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_cuti = new saiCBBL(this,{bound:[20,13,220,20],caption:"Jenis Cuti", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,500,400], childPage:["List Karyawan","List Cuti Besar"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		              	colTitle:["NIK","Nama","Sisa Thn Lalu"],
						  colWidth:[[2,1,0],[100,200,120]],		
						  readOnly:true,
						  colFormat:[[2],[cfNilai]],													
						autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

		// this.e_periode = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		// this.l_tgl1 = new portalui_label(this.pc2.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		// this.dp_d1 = new portalui_datePicker(this.pc2.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		// this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"No Close",maxLength:30,readOnly:true});
		// this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});

		// this.pc3 = new pageControl(this.pc2.childPage[1],{bound:[5,13,450,370], childPage:["List Karyawan"]});
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
			colTitle:["NIK","Nama","Sisa Cuti"],
			colWidth:[[2,1,0],[100,200,120]],		
			readOnly:true,
			colFormat:[[2],[cfNilai]],													
		  autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

		
		
		//this.cb1 = new portalui_checkBox(this,{bound:[420,24,100,25],caption:"Preview",selected:true});
		this.rearrangeChild(10, 23);
		// this.pc2.childPage[0].rearrangeChild(10, 23);
		// this.pc2.childPage[1].rearrangeChild(10, 23);
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
	
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_cuti.setSQL("select sts_cuti, nama from gr_status_cuti where kode_lokasi='"+this.app._lokasi+"'",["sts_cuti","nama"],false,["Kode","Nama"],"and","Data Jenis Cuti",true);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fCutiClose.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fCutiClose.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 1) this.doClick(this.i_gen);	

					if(this.cb_cuti.getText() == "2"){
						for (var x=0;x < this.sg2.getRowCount();x++){
							if (this.sg2.rowValid(x) && nilaiToFloat(this.sg2.cells(2,x)) != 0){
								var bukti = this.e_nb.getText().substr(0,10) + '-' + this.sg2.cells(0,x);
								sql.add("insert into gr_cuti(no_cuti,kode_lokasi,periode,tanggal,sts_cuti,tgl_mulai,tgl_selesai,kode_loker,alamat,alasan,nik_buat,nik_app,progress,tgl_input,nik_user,lama,sisa,lama_lalu,sisa_lalu) values "+
										"('"+bukti+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_cuti.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','CLOSE"+this.e_periode.getText()+"','CLOSE','"+this.sg2.cells(0,x)+"','"+this.sg2.cells(0,x)+"','2',getdate(),'"+this.app._userLog+"',0,0,"+parseNilai(this.sg2.cells(2,x))+","+parseNilai(this.sg2.cells(2,x))+")");							
							}
						}
					}else{

						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i) && nilaiToFloat(this.sg1.cells(2,i)) != 0){
								var bukti = this.e_nb.getText().substr(0,10) + '-' + this.sg1.cells(0,i);
								sql.add("insert into gr_cuti(no_cuti,kode_lokasi,periode,tanggal,sts_cuti,tgl_mulai,tgl_selesai,kode_loker,alamat,alasan,nik_buat,nik_app,progress,tgl_input,nik_user,lama,sisa,lama_lalu,sisa_lalu) values "+
										"('"+bukti+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_cuti.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','CLOSE"+this.e_periode.getText()+"','CLOSE','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(0,i)+"','2',getdate(),'"+this.app._userLog+"',0,0,"+parseNilai(this.sg1.cells(2,i))+","+parseNilai(this.sg1.cells(2,i))+")");							
							}
						}
					}
					
					//setTipeButton(tbAllFalse);					
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
					this.sg2.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
				break;
			case "simpan" :	
				this.simpan();
				break;							
		}
	},
	doSelectDate: function(sender, y,m,d){	
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.tahun.setText(y);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doSelectDate2: function(sender, y,m,d){			
		this.e_lama.setText("0");
		this.sg1.clear(1);
		this.sg2.clear(1);
	},	
	doChange:function(sender){
		if (sender == this.cb_cuti && this.cb_cuti.getText()!="") {
			this.sg1.clear();
			this.sg2.clear();
			this.pc1.setActivePage(this.pc1.childPage[0]);
			var data = this.dbLib.getDataProvider("select a.nik,a.nama,a.lalu-isnull(b.pakai_lalu,0) as sisa_lalu "+
			"from  "+
			"( "+
			"select a.nik,b.nama,a.kode_lokasi,sum(a.tambah) as lalu "+
			"from gr_cuti_karyawan  a "+
			"inner join gr_karyawan  b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
			"where a.sts_cuti = '"+this.cb_cuti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' and a.periode like '"+this.e_periode.getText().substr(0,4)+"%'  "+
			"group by a.nik,b.nama,a.kode_lokasi "+
			") a  "+
			"left join  "+ 
			"( "+
			"select nik_buat as nik,kode_lokasi, sum(lama_lalu) as pakai_lalu from gr_cuti "+
			"where sts_cuti='"+this.cb_cuti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and periode like '"+this.e_periode.getText().substr(0,4)+"%'  "+
			"group by nik_buat,kode_lokasi "+
			") b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+			
			"where a.kode_lokasi='"+this.app._lokasi+"' ",true);
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.nik,line.nama,floatToNilai(line.sisa_lalu)]);
				}
			} else this.sg1.clear(1);

			if(this.cb_cuti.getText() == "2"){
				this.pc1.setActivePage(this.pc1.childPage[1]);		
				var enamthnlalu= nilaiToFloat(this.tahun.getText()) - 6;
				var data2 = this.dbLib.getDataProvider("select x.nik,x.nama,isnull(xx.sisa,0) as sisa "+
				"from ( "+
				"	select nik,nama,tgl_masuk,kode_lokasi, "+
				"	case when (cast(datediff(year,tgl_masuk,'"+enamthnlalu+"-01-01')as int) % 6) = 0 then 60 "+
				"	else 0 end as jumlah, "+
				"	'-' as keterangan "+
				"	from gr_karyawan where cast(datediff(year,tgl_masuk,'"+enamthnlalu+"-01-01')as int) > 0 "+	
				") x "+
				"left join ( select a.nik,a.kode_lokasi,a.ini,isnull(b.pakai,0) as cuti, a.ini-isnull(b.pakai,0)-isnull(b.pakai_lalu,0) as sisa "+
				"		from  ( select nik,kode_lokasi,sum(jumlah-kurang) as ini "+
				"				from gr_cuti_karyawan  "+
				"				where sts_cuti = '2' and kode_lokasi='"+this.app._lokasi+"' and periode <= '"+this.e_periode.getText()+"' "+
				"				group by nik,kode_lokasi ) a  "+
				"		left join  ( select nik_buat as nik,kode_lokasi,sum(lama) as pakai,sum(lama_lalu) as pakai_lalu "+
				"					 from gr_cuti where sts_cuti='2' and kode_lokasi = '"+this.app._lokasi+"' and periode <= '"+this.e_periode.getText()+"' "+
				"				group by nik_buat,kode_lokasi ) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
				"		where a.kode_lokasi='"+this.app._lokasi+"' "+
				") xx on x.nik=xx.nik and x.kode_lokasi=xx.kode_lokasi "+
				"where jumlah > 0 and x.kode_lokasi='"+this.app._lokasi+"' ",true);
				
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2;
					this.sg2.clear();
					for (var i in data2.rs.rows){
						line2 = data2.rs.rows[i];							
						this.sg2.appendData([line2.nik,line2.nama,floatToNilai(line2.sisa)]);
					}
				} else this.sg2.clear(1);			
			}
		}
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			//this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_cuti","no_cuti",this.app._lokasi+"-CLS"+this.e_periode.getText().substr(2,4)+".","000"));
			//per periode + nik yg pemutihan
			this.e_nb.setText(this.app._lokasi+"-CLS"+this.e_periode.getText().substr(2,4)+"-NIK");
			this.cb_cuti.setFocus();
			this.stsSimpan = 1;
		}			
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							/*
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_hris_rptCuti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_cuti='"+this.e_nb.getText()+"' ";
								this.filter2 = this.app._namaUser;
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
							} 
							else {
							*/
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							//}
						}else system.info(this,result,"");
	    			break;
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();			
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear(1);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});