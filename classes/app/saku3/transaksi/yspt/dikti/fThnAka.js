window.app_saku3_transaksi_yspt_dikti_fThnAka = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_dikti_fThnAka.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_yspt_dikti_fThnAka";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Periode Akademik", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Periode","Data Periode"]});				
		this.sg3 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:2,tag:9,
		            colTitle:["Kode","Nama"],
					colWidth:[[1,0],[300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager"]});
		
		this.cb_kode = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Periode Akademik",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,400,20],caption:"Deskripsi", maxLength:50, tag:1});									

		this.l_tgl = new portalui_label(this.pc1.childPage[1],{bound:[20,15,100,18],caption:"Tanggal Mulai", underline:true});
		this.dp_d1mulai = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,15,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});																
		this.bGen = new portalui_button(this.pc1.childPage[1],{bound:[321,15,96,18],caption:"Generate",click:[this,"doGen"]});				
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,20,this.pc1.width-5,340],colCount:1,tag:9,
				colTitle:["Periode"],
				colWidth:[[0],[200]],				
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		
		this.rearrangeChild(10,23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		
		this.setTabChildIndex();		
		
		this.doLoad();		
		
		setTipeButton(tbSimpan);				
	}
};
window.app_saku3_transaksi_yspt_dikti_fThnAka.extend(window.portalui_childForm);
window.app_saku3_transaksi_yspt_dikti_fThnAka.implement({	
	doGen: function(){
		this.sg1.clear();
		this.doSelectDate(this.dp_d1mulai,this.dp_d1mulai.year,this.dp_d1mulai.month,this.dp_d1mulai.day);

		this.sg1.appendData([this.periode]);
		for (var i = 1; i <= 5;i++){
			this.periode = getNextPeriode(this.periode);
			this.sg1.appendData([this.periode]);
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
					this.doLoad();
					this.pc1.setActivePage(this.pc1.childPage[0]);														
				}
				break;
			case "simpan" :	
			case "ubah" :										
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();								
							sql.add("delete from dikti_ta where kode_lokasi='"+this.app._lokasi+"' and kode_ta='"+this.cb_kode.getText()+"'");

							for (var i=0;i < this.sg1.getRowCount();i++){									
								sql.add("insert into dikti_ta(kode_ta,nama,periode,kode_lokasi,tgl_mulai) values "+
										"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','"+this.dp_d1mulai.getDateString()+"')");
							}							
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;		
			case "hapus" :	
				if (this.standarLib.checkEmptyByTag(this, [0,1])){
					try {									
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();
						sql.add("delete from dikti_ta where kode_ta = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						setTipeButton(tbAllFalse);
						this.dbLib.execArraySQL(sql);
					}
					catch(e){
						system.alert(this, e,"");
					}
				}
				break;			
		}
	},	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;							
		this.periode = y+""+m;
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select periode,nama,tgl_mulai from dikti_ta where kode_lokasi='"+this.app._lokasi+"' and kode_ta='"+this.cb_kode.getText()+"' order by periode",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.periode]);
					}
					this.e_nama.setText(line.nama);					
					this.dp_d1mulai.setText(line.tgl_mulai);					
				} else this.sg1.clear(1);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Tahun Akademik",sender,undefined, 
											  "select distinct kode_ta,nama from dikti_ta where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(*) from (select distinct kode_ta from dikti_ta where kode_lokasi='"+this.app._lokasi+"') a",
											  ["kode_ta","nama"],"and",["Kode","Deskripsi"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.cb_kode.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.cb_kode.setText(this.sg3.cells(0,row));	
				this.pc1.setActivePage(this.pc1.childPage[1]);																													
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){								
		var strSQL = "select distinct kode_ta,nama "+
					 "from dikti_ta where kode_lokasi='"+this.app._lokasi+"' order by kode_ta desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
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
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg3.appendData([line.kode_ta,line.nama]); 
		}
		this.sg3.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData3(page);
	}
});
